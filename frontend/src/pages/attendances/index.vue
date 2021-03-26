<template lang='pug'>
  .attendances
    .text-center
      a.fa.fa-step-backward.fa-fw(:href='`?start-date=${prev}`')
      | {{ current }}
      a.fa.fa-step-forward.fa-fw(:href='`?start-date=${next}`')
    br
    .table-responsive
      table.table.table-bordered
        thead
          th
          header-cell(
            v-for='attendanceDay in attendanceDays',
            :key='attendanceDay.id',
            :attendance-day-id='attendanceDay.id'
            :attendance-day-type='attendanceDay.type'
          )
        tbody
          tr(v-for='user in users')
            user-cell(:user-id='user.id', :type='user.type')
            body-cell(
              v-for='attendanceDay in attendanceDays',
              :attendanceDayId='attendanceDay.id',
              :userId='user.id',
              :userType='user.type',
              :key='attendanceDay.id',
              @showModal='showModal'
            )
    modal(
      v-if="currentAttendanceDay"
      :day="currentAttendanceDay.id",
      :userId="currentUser.id",
      :key="currentAttendanceDay.id + '-' + currentUser.id",
      ref='modal'
    )
</template>

<script>
import HeaderCell from 'components/attendances/header-cell'
import UserCell from 'components/attendances/user-cell'
import BodyCell from 'components/attendances/body-cell'
import Modal from 'components/attendances/modal'
import store from 'store'

export default {
  components: {
    HeaderCell,
    UserCell,
    BodyCell,
    Modal
  },
  data () {
    return {
      currentAttendanceDay: null,
      currentAttendanceDayRefs: [],
      attendanceDayRefs: [],
      currentUser: null,
      prev: null,
      current: null,
      next: null
    }
  },
  async beforeRouteEnter (to, _from, next) {
    store.dispatch('get', 'users')
    next(vm => {
      store.dispatch(
        'attendanceDays',
        vm.startDate
      ).then(response => {
        vm.prev = response.links.meta.prev
        vm.current = response.links.meta.current
        vm.next = response.links.meta.next
        vm.attendanceDayRefs = response.data
      })
      store.dispatch(
        'attendanceEvents',
        vm.startDate
      ).then(response => {
        vm.attendanceEventRefs = response.data
      })
    })
  },
  computed: {
    startDate () {
      var urlParams = new URLSearchParams(location.search)
      return urlParams.get('start-date')
    },
    currentAttendanceDayType () {
      return this.currentAttendanceDay && this.currentAttendanceDay.type
    },
    users () {
      return this.$store.getters.users
    },
    attendanceDays () {
      return this.attendanceDayRefs.map(attendanceDayRef => {
        return this.$store.getters.entry(attendanceDayRef)
      })
    },
    attendanceEvents () {
      return this.attendanceEventRefs.map(attendanceEventRef => {
        return this.$store.getters.entry(attendanceEventRef)
      })
    }
  },
  methods: {
    showModal ({ day, user }) {
      this.currentAttendanceDay = day
      this.currentUser = user
      if (this.$refs.modal) this.$refs.modal.show()
    }
  },
  watch: {
    startDate () {
      this.$store.dispatch('attendanceEvents')
    }
  }
}
</script>
