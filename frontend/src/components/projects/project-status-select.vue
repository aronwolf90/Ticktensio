<template lang='pug'>
  #project-status-select
    detail-select(
      label="Status",
      :options='options',
      :item='item',
      @select="onSelect"
    )
</template>

<script>
import DetailSelect from 'components/detail-select'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    DetailSelect
  },
  computed: {
    project () {
      return this.$store.getters['projectsShow/project']
    },
    projectStatuses () {
      return this.$store.getters.projectStatuses || []
    },
    projectStatus () {
      const projectStatusRef = Utils.relationship(
        this.project,
        'project-status'
      )
      if (!projectStatusRef) return
      return this.$store.getters.entry(projectStatusRef)
    },
    item () {
      return {
        value: this.projectStatus,
        text: Utils.attribute(this.projectStatus, 'name')
      }
    },
    options () {
      const blankOption = { value: null, text: '' }
      const options = this.projectStatuses.map(projectStatus => {
        return {
          value: Utils.entryToRef(projectStatus),
          text: Utils.attribute(projectStatus, 'name')
        }
      })

      return [blankOption].concat(options)
    }
  },
  methods: {
    onSelect (projectStatus) {
      this.$store.dispatch('projectsShow/changeProjectStatus', projectStatus.value)
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
