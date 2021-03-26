<template lang='pug'>
  details-date-time.deadline-at(
    @submit="submit",
    label="Deadline at",
    id="deadline-at",
    v-model="attributes['deadline-at']",
    :isSaving="isSaving",
    :isPersisted="isPersisted"
  )
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import detailsDateTime from 'components/details-date-time'

export default {
  components: {
    detailsDateTime
  },
  props: ['issueId'],
  data () {
    return {
      isSaving: false,
      persistedDeadlineAt: null,
      attributes: {
        'deadline-at': null
      }
    }
  },
  created () {
    this.$store.dispatch('initIssue', this.issueId).then(response => {
      this.persistedDeadlineAt = Utils.attribute(response.data, 'deadline-at')
      this.attributes['deadline-at'] = Utils.attribute(response.data, 'deadline-at')
    })
  },
  computed: {
    issue () {
      return this.$store.getters.issue(this.issueId)
    },
    isPersisted () {
      return this.persistedDeadlineAt === this.attributes['deadline-at']
    }
  },
  methods: {
    submit (event) {
      this.isSaving = true
      this.$store.dispatch('updateIssue', {
        entry: this.issue,
        attributes: this.attributes
      }).then((response) => {
        this.isSaving = false
        this.persistedDeadlineAt = this
          .$store
          .getters
          .issue(this.issueId)
          .attributes['deadline-at']
      })
    }
  }
}
</script>
