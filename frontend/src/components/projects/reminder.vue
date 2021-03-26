<template lang='pug'>
  .reminder(:class="statusClass")
    .pull-right.b-button
      .fa.fa-check(@click="closeIssue")
    .title
      router-link(:to="`${projectId}/issues/${id}`", :class="statusClass")
        | {{ title }}
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['id', 'type', 'projectId'],
  computed: {
    issue () {
      return this.$store.getters.entry({
        id: this.id,
        type: this.type
      })
    },
    title () {
      return Utils.attribute(this.issue, 'title')
    },
    statusClass () {
      if (Utils.attribute(this.issue, 'status') === 'warning') {
        return 'bg-warning text-secondary'
      }
      if (Utils.attribute(this.issue, 'status') === 'danger') {
        return 'bg-danger text-white'
      }
      return 'text-secondary'
    }
  },
  methods: {
    closeIssue () {
      this.$store.dispatch('projectsShow/closeIssue', this.issue)
    }
  }
}
</script>

<style lang='sass' scoped>
  .reminder
    padding-top: 4px
    padding-bottom: 4px
    margin-left: -18px
    margin-right: -18px
    padding-left: 18px
    padding-right: 18px
    border-bottom: 1px solid #e7e7e7
    .title
      overflow: hidden
      text-overflow: ellipsis
      max-width: 150px
</style>
