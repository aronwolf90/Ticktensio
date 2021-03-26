<template lang='pug'>
  b-form(@submit.prevent="$emit('submit')")
    form-input-record-select(
      id="issue-input",
      v-model="formIssueRef",
      label="Ticket",
      errorPath="relationships/issue",
      :errors="errors"
    )
    form-input-date-time(
      id="start-time-input",
      v-model="formStartTime",
      label="Start time",
      :required="true",
      errorPath="attributes/start-time",
      :errors="errors"
    )
    form-input-date-time(
      id="end-time-input",
      v-model="formEndTime",
      label="End time",
      :required="true",
      errorPath="attributes/end-time",
      :errors="errors"
    )
    br
    slot
</template>

<script>
import FormInputRecordSelect from 'components/form-inputs/issue-select'
import FormInputDateTime from 'components/form-inputs/date-time'

export default {
  components: {
    FormInputRecordSelect,
    FormInputDateTime
  },
  props: {
    submitText: String
  },
  computed: {
    formIssueRef: {
      get () {
        return this.$store.getters['recordsForm/formIssueRef']
      },
      set (issueRef) {
        this.$store.commit('recordsForm/formIssueRef', issueRef)
      }
    },
    formStartTime: {
      get () {
        return this.$store.getters['recordsForm/formStartTime']
      },
      set (startTime) {
        this.$store.commit('recordsForm/formStartTime', startTime)
      }
    },
    formEndTime: {
      get () {
        return this.$store.getters['recordsForm/formEndTime']
      },
      set (endTime) {
        this.$store.commit('recordsForm/formEndTime', endTime)
      }
    },
    errors () {
      return this.$store.getters['recordsForm/errors']
    }
  }
}
</script>
