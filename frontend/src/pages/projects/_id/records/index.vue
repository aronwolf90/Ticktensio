<template lang='pug'>
  .records-index
    .align-items-center
      .pull-right.btn-group
        b-button(variant="success", :href="`/administration/projects/${projectId}/records.csv`")
          i.fa.fa-file-excel-o
      | {{ thisMonthSpendedTime }} hours has been spent this month
    br
    records-index-body(
      :record-days="projectRecordDays",
      :pagination-page-count="paginationPageCount",
      :pagination-current-page="paginationCurrentPage",
      :fetching-page="fetchingPage"
    )
</template>

<script>
import RecordsIndexBody from 'components/records/index-body'
import recordsIndex from 'store/modules/records-index'
import store from 'store'

if (!store.hasModule('recordsIndex')) {
  store.registerModule('recordsIndex', recordsIndex)
}

export default {
  components: {
    RecordsIndexBody
  },
  async beforeRouteEnter (to, from, next) {
    await store.dispatch('projectsRecordsIndex/fetch', {
      projectId: to.params.id,
      page: to.query.page
    })
    next()
  },
  async beforeRouteUpdate (to, from, next) {
    await store.dispatch('projectsRecordsIndex/fetch', {
      projectId: to.params.id,
      page: to.query.page
    })
    next()
  },
  computed: {
    projectRecordDays () {
      return this.$store.getters['projectsRecordsIndex/projectRecordDays']
    },
    thisMonthSpendedTime () {
      const seconds = this.$store.getters['projectsRecordsIndex/monthSpentTime']
      return [seconds / 3600, seconds / 60 % 60, seconds % 60].map(floatTime => {
        let time = Math.floor(floatTime)
        if (time < 60) {
          return `00${time}`.slice(-2)
        } else {
          return time
        }
      }).join(':')
    },
    paginationPageCount () {
      return this.$store.getters['projectsRecordsIndex/paginationPageCount']
    },
    paginationCurrentPage () {
      return this.$store.getters['projectsRecordsIndex/paginationCurrentPage']
    },
    fetchingPage () {
      return this.$store.getters['projectsRecordsIndex/fetchingPage']
    },
    projectId () {
      return this.$store.getters['projectsRecordsIndex/projectId']
    }
  },
  methods: {
    linkGen (page) {
      return page === 1 ? '?' : `?page=${page}`
    }
  }
}
</script>
