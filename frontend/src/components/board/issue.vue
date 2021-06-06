<template lang='pug'>
  board-item
    template(v-slot:text="")
      router-link(:to="showPath")
        | {{ name }}
    template(v-slot:main-action="")
      issues-record-section(:issue-id="issueId")
    template(v-slot:extra-information="")
      issue-extra-information(:issue-ref="issue")
</template>

<script>

import { Utils } from 'vuex-jsonapi-client'
import BoardItem from 'components/boards/items'
import IssuesRecordSection from 'components/issues-record-section'
import IssueExtraInformation from 'components/ticket-board/issue-extra-information'

export default {
  props: { 'issue-id': { required: true }, 'board-list-id': { required: true } },
  components: {
    IssuesRecordSection,
    BoardItem,
    IssueExtraInformation
  },
  computed: {
    issue () {
      return this.$store.getters.entry({ type: 'issues', id: this.issueId })
    },
    name () {
      return Utils.attribute(this.issue, 'title')
    },
    showPath () {
      return `issues/${this.issueId}`
    },
    labels () {
      return this.$store.getters.relationship({
        entry: this.issue,
        name: 'labels'
      }) || []
    }
  }
}

</script>
