<template lang='pug'>
  .issues-record-section
    .clock(
      v-if='record',
      @click.stop.prevent='clickStop'
    )
      .fa.fa-stop
    .play_btn(
      v-else,
      @click.stop.prevent='clickPlay'
    )
      .fa.fa-play
</template>

<script>

export default {
  props: ['issueId', 'board_list_id'],
  data () {
    return { time: '00:00:00' }
  },
  mounted () {
    setInterval(() => {
      this.time = this.consumedTime()
    }, 1000)

    this.$store.dispatch('initCurrentUser')
    this.$store.dispatch('initCurrentRecord')
  },
  computed: {
    issue () {
      return this.$store.getters.entry({
        type: 'issues',
        id: this.issueId
      })
    },
    currentUser () {
      return this.$store.getters.currentUser
    },
    currentRecord () {
      return this.$store.getters.currentRecord
    },
    record () {
      if (!this.issue) return
      if (!this.currentRecord) return
      if (this.currentRecord.relationships.issue.data.id === this.issue.id) {
        return this.currentRecord
      }
    }
  },
  methods: {
    clickPlay () {
      this.$store.dispatch('createRecord', {
        attributes: { 'start-time': (new Date()).toString() },
        user: this.currentUser,
        issue: this.issue
      })
    },
    clickStop () {
      this.$store.dispatch('updateRecord', {
        entry: this.record,
        payload: { attributes: { 'end-time': (new Date()).toString() } }
      })
    },
    consumedTime () {
      if (!this.record) return '00:00:00'

      let startTime = (new Date(this.record.attributes['start-time'])).getTime()
      let currentTime = new Date().getTime()
      let interval = (currentTime - startTime) / 1000

      let hours = Math.floor(interval / 3600).toString()
      let minutes = Math.floor(interval / 60 - hours * 60).toString()
      let seconds = Math.floor(interval - minutes * 60 - hours * 120).toString()
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
    }
  }
}

</script>

<style lang='sass' scoped>
.issues-record-section
  cursor: pointer
</style>
