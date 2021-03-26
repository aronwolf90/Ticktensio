<template lang='pug'>
  project-status-form(
    v-model="form",
    :errors="errors",
    @submit="submit"
  )
</template>

<script>
import ProjectStatusForm from 'components/project-statuses/form'

export default {
  components: {
    ProjectStatusForm
  },
  data () {
    return {
      form: {
        attributes: {
          name: null,
          'display-as': 'list'
        }
      },
      errors: []
    }
  },
  methods: {
    submit (event) {
      this.$store.dispatch('createProjectStatus', this.form).then(response => {
        this.$router.push(`/administration/project_statuses/${response.data.data.id}`)
      }).catch(({ status, data }) => {
        this.errors = data.errors
      })
    }
  }
}
</script>
