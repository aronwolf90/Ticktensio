<template lang='pug'>
  project-board-list-form(
    v-model="form",
    :errors="errors",
    show-destroy-btn="true",
    :disable-destroy-btn='disableDestroyBtn',
    @submit="submit",
    @destroy="destroy",
    :cancel-path="`/administration/project_statuses/${projectStatusId}?project-board=true`",
    v-if="show"
  )
</template>

<script>
import ProjectBoardListForm from 'components/project-board-lists/form'
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['id'],
  components: {
    ProjectBoardListForm
  },
  data () {
    return {
      form: {
        attributes: {
          name: null
        }
      },
      errors: [],
      show: false
    }
  },
  created () {
    this.$store.dispatch('getProjectBoardList', this.id).then(response => {
      this.form.attributes.name = response.data.attributes.name
      this.show = true
    })
  },
  computed: {
    projectBoardList () {
      return this.$store.getters.projectBoardList(this.id)
    },
    projectStatusId () {
      if (!this.projectBoardList) return
      return Utils.relationship(this.projectBoardList, 'project-status').id
    },
    disableDestroyBtn () {
      if (!this.projectBoardList) return true
      return !this.projectBoardList.meta.permissions.destroy
    }
  },
  methods: {
    submit (event) {
      this.$store.dispatch('updateProjectBoardList', {
        payload: this.form,
        projectBoardList: this.projectBoardList
      }).then(() => {
        this.$router.push(`/administration/project_statuses/${this.projectStatusId}?project-board=true`)
      }).catch(({ status, data }) => {
        this.errors = data.errors
      })
    },
    destroy () {
      const projectStatusId = this.projectStatusId

      this.$store.dispatch(
        'destroyProjectBoardList',
        this.projectBoardList
      ).then(() => {
        this.$router.push(`/administration/project_statuses/${projectStatusId}?project-board=true`)
      })
    }
  }
}
</script>
