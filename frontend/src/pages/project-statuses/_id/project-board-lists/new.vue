<template lang='pug'>
  project-board-list-form(
    v-model="form",
    :errors="errors",
    @submit="submit",
    :cancel-path="`/administration/project_statuses/${projectStatusId}?project-board=true`"
  )
</template>

<script>
import ProjectBoardListForm from 'components/project-board-lists/form'

export default {
  props: ['project-status-id'],
  components: {
    ProjectBoardListForm
  },
  data () {
    return {
      form: {
        attributes: {
          name: null
        },
        relationships: {
          'project-status': {
            data: {
              id: this.projectStatusId,
              type: 'project-statuses'
            }
          }
        }
      },
      errors: []
    }
  },
  methods: {
    submit (event) {
      this.$store.dispatch('createProjectBoardList', this.form).then(response => {
        this.$router.push(`/administration/project_statuses/${this.projectStatusId}?project-board=true`)
      }).catch(({ status, data }) => {
        this.errors = data.errors
      })
    }
  }
}
</script>
