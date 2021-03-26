<template lang='pug'>
  #shared-issue-section
    current-record
    current-issue
    issues-search-section

</template>

<script>
import CurrentRecord from 'components/shared-issue-section/current_record'
import CurrentIssue from 'components/shared-issue-section/current_issue'
import IssuesSearchSection from 'components/shared-issue-section/issues_search_section'

export default {
  components: {
    'current-record': CurrentRecord,
    'current-issue': CurrentIssue,
    'issues-search-section': IssuesSearchSection
  }
}
</script>

<style lang='sass' scoped>
#shared-issue-section
  border-top: 1px solid #e7e7e7
  position: relative
  width: 100%
  border-right: 2px solid #e7e7e7
</style>
