<template lang='pug'>
  project-status-form(
    v-model="form",
    :errors="errors",
    @submit="submit",
    v-if="show"
  )
</template>

<script>
import ProjectStatusForm from 'components/project-statuses/form'

export default {
  props: ['id'],
  components: {
    ProjectStatusForm
  },
  data () {
    return {
      show: false,
      form: {
        attributes: {
          name: null
        }
      },
      errors: []
    }
  },
  async created () {
    const response = await this.$store.dispatch('getProjectStatus', this.id)
    this.form.attributes.name = response.data.attributes.name
    this.form.attributes['display-as'] =
      response.data.attributes['display-as']
    this.show = true
  },
  computed: {
    projectStatus () {
      return this.$store.getters.projectStatus(this.id)
    }
  },
  methods: {
    submit (event) {
      this.$store.dispatch('updateProjectStatus', {
        payload: this.form,
        projectStatus: this.projectStatus
      }).then(() => {
        this.$router.push(`/administration/project_statuses/${this.projectStatus.id}`)
      }).catch(({ status, data }) => {
        this.errors = data.errors
      })
    }
  }
}
</script>
