<template lang='pug'>
  .records-index-body
    .table-responsive
      table.table
        tbody
          template(v-for="recordDay in recordDays")
            tr(:key="`record-day-${recordDay.id}`")
              td(colspan=3)
                .font-weight-bold {{ recordDay.attributes.day }}
              td
                .pull-right {{ formatSpentTime(recordDay.attributes['spent-time']) }}
            tr(
              v-for="record in $store.getters.relationship(recordDay, 'records')",
              :key="`record-${record.id}`"
            )
              td {{ record.attributes.description }}
              td {{ `${record.attributes['start-time']}`.slice(-18).slice(0, 5) }}
              td {{ `${record.attributes['end-time']}`.slice(-18).slice(0, 5) }}
              td
                b-button.pull-right(
                  variant="secondary",
                  size="sm",
                  :to="`/administration/records/${record.id}/edit`",
                  v-if="record.meta.permissions.update"
                )
                  i.fa.fa-edit
    b-pagination-nav(
      :link-gen="linkGen",
      :number-of-pages="paginationPageCount",
      :value="paginationCurrentPage",
      use-router="",
      @page-click.prevent=""
    )
</template>

<script>
export default {
  props: {
    recordDays: {
      required: true
    },
    paginationPageCount: {
      required: true
    },
    paginationCurrentPage: {
      required: true
    },
    fetchingPage: {
      required: true
    }
  },
  methods: {
    linkGen (page) {
      return page === 1 ? '?' : `?page=${page}`
    },
    formatSpentTime (seconds) {
      return [seconds / 3600, seconds / 60 % 60, seconds % 60].map(floatTime => {
        let time = Math.floor(floatTime)
        if (time < 60) {
          return `00${time}`.slice(-2)
        } else {
          return time
        }
      }).join(':')
    }
  }
}
</script>
