<template lang='pug'>
  td(
    :class='classes',
    @click='onClick'
  )
</template>

<script>
export default {
  props: ['attendance-day-id', 'user-id', 'user-type'],
  computed: {
    attendanceDay () {
      return this.$store.getters.entry({
        id: this.attendanceDayId,
        type: 'attendance-days'
      })
    },
    attendanceEventClass () {
      if (!this.attendanceEvent) return ''
      return `${this.attendanceEvent.type}`
    },
    classes () {
      return `${this.attendanceDay.attributes.kind} ${this.attendanceEventClass}`
    },
    day () {
      return this.attendanceDay.attributes.day
    },
    user () {
      return this.$store.getters.entry({ type: this.userType, id: this.userId })
    },
    attendanceEvent () {
      return this.$store.getters.attendanceEventForDay({
        day: this.day,
        userId: this.userId
      })
    }
  },
  methods: {
    onClick () {
      this.$emit(
        'showModal', {
          day: this.attendanceDay,
          user: this.user
        }
      )
    }
  }
}
</script>

<style lang='sass' scoped>
  td
    &:hover
      background-color: rgba(20,20,20,0.1)
      cursor: pointer
    &.holiday-day, &.weekend-day
      background-color: rgba(20,20,20,0.07)
      &:hover
        background-color: rgba(20,20,20,0.2) !important
    &.attendance-events
      background-color: green
      &:hover
        background-color: DarkSlateGray !important
</style>
