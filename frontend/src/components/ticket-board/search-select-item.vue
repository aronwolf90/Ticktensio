<template lang='pug'>
  search-select-item(
    :title="title",
    :link="link",
    v-if="issue"
  )
    issue-extra-information(:issueRef='issueRef')
</template>

<script>
import SearchSelectItem from 'components/search-select-item'
import IssueExtraInformation from 'components/ticket-board/issue-extra-information'
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['issueRef'],
  components: {
    SearchSelectItem,
    IssueExtraInformation
  },
  computed: {
    issue () {
      return this.$store.getters.entry(this.issueRef)
    },
    title () {
      return Utils.attribute(this.issue, 'title')
    },
    link () {
      return `issues/${this.issueRef.id}`
    }
  }
}
</script>

<style lang='sass' scoped>
a
  color: black
</style>
