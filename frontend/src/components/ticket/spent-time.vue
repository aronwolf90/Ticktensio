<template lang='pug'>
  .spent-time
    .row
      .col-12
         .title My spent time
    .row
      .col-8
        .time {{ time }}
      .col-4
        issue-record-section(:issue-id='issueId')
</template>

<script>
import IssueRecordSection from 'components/issues-record-section'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: { IssueRecordSection },
  props: ['issueId'],
  data () {
    return { time: '00:00:00' }
  },
  created () {
    this.$store.dispatch('initUserIssueForCurrentUser', this.issueId)
    this.$store.dispatch('initCurrentIssue')
    this.$store.dispatch('initCurrentUser')
  },
  mounted () {
    setInterval(() => {
      this.time = this.consumedTime()
    }, 1000)
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    },
    currentIssue () {
      return this.$store.getters.currentIssue
    },
    currentRecord () {
      return this.$store.getters.currentRecord
    },
    userIssue () {
      if (!this.currentUser) return
      return this.$store.getters.entry({
        type: 'user-issues',
        id: `${this.currentUser.id},${this.issueId}`
      })
    }
  },
  methods: {
    aditionalTime () {
      if (!this.currentIssue) return 0
      if (this.currentIssue.id !== this.issueId) return 0
      let startTime = (new Date(this.currentRecord.attributes['start-time'])).getTime()
      let currentTime = new Date().getTime()
      return (currentTime - startTime) / 1000
    },
    consumedTime () {
      let interval = Utils.attribute(this.userIssue, 'spent-time') + this.aditionalTime()
      let hours = Math.floor(interval / 3600).toString()
      let minutes = Math.floor(interval / 60 - hours * 60).toString()
      let seconds = Math.floor(interval - minutes * 60 - hours * 3600).toString()
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
    }
  }
}
</script>

<style lang='sass'>
.spent-time
  padding: 17px
  color: grey
  border-bottom: 1px solid #e7e7e7
  .row
    padding-top: 8px
</style>
