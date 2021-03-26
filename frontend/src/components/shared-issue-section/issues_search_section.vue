<template lang='pug'>
  .issues-search-section
    .relevant-issues.container-fluid
      issue(v-for='issue in issues', :key='issue.id', :issue-id='issue.id')
    input.search-section(type='text', placeholder='\uf002', v-model='searchText')

</template>

<script>
import Issue from 'components/shared-issue-section/issue'
import { Utils } from 'vuex-jsonapi-client'

export default {
  data: () => ({
    searchText: '',
    time: '00:00:00',
    requestIssues: null
  }),
  created () {
    this.request()
    this.$store.dispatch('initCurrentIssue')
  },
  components: {
    'issue': Issue
  },
  computed: {
    currentIssue () {
      return this.$store.getters.currentIssue
    },
    relevantIssues () {
      return this.requestIssues || this.$store.getters.metaCollection('issues') || []
    },
    issues () {
      return this.relevantIssues.filter(entry => {
        return !Utils.sameRef(this.currentIssue, entry)
      })
    }
  },
  methods: {
    request () {
      this.$store.dispatch('add', {
        url: `/api/v1/issues?query=${this.searchText}`
      }).then(response => {
        this.requestIssues = response.data
      })
    }
  },
  watch: {
    searchText () {
      this.request()
    }
  }
}
</script>

<style lang='sass' scoped>
.issues-search-section
  padding-bottom: 19px
  .relevant-issues
    padding-left: 0 !important
    min-height: 220px
    max-height: 220px
    max-width: 170px
    overflow: auto
    .issue
      margin-left: 0
  .search-section
    width: calc(100% - 2px)
    border-right: 0
    border-left: 0
    border-bottom: 0
    border-top: 0
    font-family: FontAwesome
    &::placeholder
      text-align: center
</style>
