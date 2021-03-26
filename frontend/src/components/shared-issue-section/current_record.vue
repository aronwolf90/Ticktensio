<template lang='pug'>
  .container-fluid(v-if='currentRecord')
    .row.current-record
      .col-2
      .col-8
        | {{ time }}
      .col-2
        issue-record-section(:issue-id='currentIssueID')
</template>

<script>
import IssueRecordSection from 'components/issues-record-section'
import { Utils } from 'vuex-jsonapi-client'

export default {
  data: () => ({ search_text: '', time: '00:00:00' }),
  components: {
    'issue-record-section': IssueRecordSection
  },
  mounted () {
    this.$store.dispatch('initCurrentRecord')

    setInterval(() => {
      this.time = this.consumedTime()
    }, 1000)
  },
  computed: {
    currentRecord () {
      return this.$store.getters.currentRecord
    },
    currentIssueID () {
      if (!Utils.relationship(this.currentRecord, 'issue')) return
      return Utils.relationship(this.currentRecord, 'issue').id
    }
  },
  methods: {
    consumedTime () {
      if (!this.currentRecord) return '00:00:00'

      let startTime = (new Date(this.currentRecord.attributes['start-time'])).getTime()
      let currentTime = new Date().getTime()
      let interval = (currentTime - startTime) / 1000
      let hours = Math.floor(interval / 3600).toString()
      let minutes = Math.floor(interval / 60 - hours * 60).toString()
      let seconds = Math.floor(interval - minutes * 60 - hours * 3600).toString()
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
    }
  }
}
</script>

<style lang='sass' scoped>
.current-record
  text-align: center
  color: grey
  padding-top: 8px
  .col-2
    padding: 0
</style>
