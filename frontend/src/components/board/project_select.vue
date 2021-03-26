<template lang='pug'>
  #project-select(v-if='projects && currentUser')
    v-select(
      v-model='selected',
      :options='options',
      @search="fetchOptions"
    )
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  components: {
    VSelect
  },
  created () {
    this.$store.dispatch('getProjects')
    this.$store.dispatch('initCurrentUser').then(() => {
      const project = Utils.relationship(this.currentUser, 'selected-project')
      if (project) {
        this.$store.dispatch('getProject', project.id)
      }
    })
  },
  computed: {
    options () {
      let firstEntry = []
      if (Utils.attribute(this.context, 'global-board')) {
        firstEntry = [{ code: '', label: 'All' }]
      }
      return firstEntry.concat((this.projects || [])
        .map(project => {
          return { code: project.id, label: project.attributes.name }
        }))
    },
    context () {
      return this.$store.getters.context
    },
    projects () {
      return this.$store.getters.projects
    },
    currentUser () {
      return this.$store.getters.currentUser
    },
    selectedProject () {
      return this.$store.getters.relationship({
        entry: this.currentUser,
        name: 'selected-project'
      })
    },
    selected: {
      get () {
        if (this.selectedProject) {
          return {
            code: this.selectedProject.id,
            label: Utils.attribute(this.selectedProject, 'name')
          }
        }
        return { code: '', label: 'All' }
      },
      set (value) {
        this.$store.dispatch('updateUser', {
          entry: this.currentUser,
          selectedProject: this.$store.getters.entry({
            id: value.code, type: 'projects' }) || null
        }).then(() => this.$store.dispatch('board/fetch', value.code))
      }
    }
  },
  methods: {
    fetchOptions (search, loading) {
      loading(true)
      this.$store.dispatch('searchProject', search).then(() => {
        loading(false)
      })
    }
  }
}
</script>
