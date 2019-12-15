<template lang='pug'>
  #complexity(v-if='projects && currentUser')
    b-form-select(v-model='selected', :options='options', size="sm", id="project-select")
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'

export default {
  created () {
    this.$store.dispatch('initProjects')
    this.$store.dispatch('initCurrentUser')
  },
  computed: {
    options () {
      return (this.projects || []).map(project => {
        return { value: project.id, text: project.attributes.name }
      })
    },
    projects () {
      return this.$store.getters.projects
    },
    currentUser () {
      return this.$store.getters.currentUser
    },
    selectedProject () {
      return Utils.relationship(this.currentUser, 'selected-project')
    },
    selected: {
      get () {
        if (this.selectedProject) {
          this.selectedChanged(this.selectedProject.id)
          return this.selectedProject.id
        }
        this.selectedChanged(null)
        return null
      },
      set (value) {
        this.$store.dispatch('updateUser', {
          entry: this.currentUser,
          selectedProject: this.$store.getters.entry({
            id: value, type: 'projects' }) || null
        }).then(() => this.$store.dispatch('board/getBoardLists'))
      }
    }
  },
  methods: {
    /*
    * HACK: when click and return to this page turbolinks not preserve
    * the selected option so a few milliseconds appear wrong option. This
    * hack sole this
    */
    selectedChanged (value) {
      setTimeout(() => {
        let option = null
        if (value) {
          option = document.querySelectorAll(`#complexity option[value="${value}"]`)
        }
        else {
          option = document.querySelectorAll('#complexity option')
        }

        if (option.length) option[0].setAttribute('selected', true)
      }, 10)
    }
  }
}
</script>
