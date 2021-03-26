<template lang='pug'>
  tr
    td
      router-link.text-dark(:to="`/administration/projects/${projectId}`")
        | {{ name }}
    td
      b-badge {{ status }}
    td
      router-link.btn.btn-secondary.btn-sm.pull-right(
        :to="`/administration/projects/${projectId}/edit`"
      )
        .fa.fa-edit
      .clearfix
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['projectId', 'projectType'],
  computed: {
    name () {
      return Utils.attribute(this.project, 'name') || 'Loading'
    },
    projectStatus () {
      return this.$store.getters.relationship({
        entry: this.project,
        name: 'project-status'
      })
    },
    status () {
      return Utils.attribute(this.projectStatus, 'name')
    },
    project () {
      return this.$store.getters.entry({
        id: this.projectId,
        type: this.projectType
      })
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
