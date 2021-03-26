<template lang='pug'>
  td.text-nowrap(:class='kind') {{ day }}
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import dateFormat from 'dateformat'

export default {
  props: {
    attendanceDayId: {
      required: true
    },
    attendanceDayType: {
      required: true,
      type: String
    }
  },
  computed: {
    attendanceDay () {
      return this.$store.getters.entry({
        id: this.attendanceDayId,
        type: 'attendance-days'
      })
    },
    day () {
      if (!this.attendanceDay) return
      let day = this.attendanceDay.attributes.day
      return dateFormat(day, 'ddd d')
    },
    kind () {
      return Utils.attribute(this.attendanceDay, 'kind')
    }
  }
}
</script>

<style lang='sass' scoped>
  .holiday-day, .weekend-day
    background-color: rgba(20,20,20,0.07)
</style>
