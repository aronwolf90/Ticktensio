<template lang='pug'>
  .current-issue(v-if='currentIssue')
    a(v-bind:href='showPath')
      | {{ title }}

</template>

<script>
import { Utils } from 'vuex-jsonapi-client'

export default {
  created () {
    this.$store.dispatch('initCurrentIssue')
  },
  computed: {
    currentIssue () {
      return this.$store.getters.currentIssue
    },
    title () {
      return Utils.attribute(this.currentIssue, 'title')
    },
    boardListId () {
      if (!Utils.relationship(this.currentIssue, 'board-list')) return
      return Utils.relationship(this.currentIssue, 'board-list').id
    },
    showPath () {
      if (!this.currentIssue) return
      return `/administration/issues/${this.currentIssue.id}`
    }
  }
}
</script>

<style lang='sass' scoped>
.current-issue
  padding: 10px
  text-align: center
  border-bottom: 1px solid #e7e7e7
  text-overflow: ellipsis
  a
    color: grey
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    display: block
    max-width: 100%

</style>
