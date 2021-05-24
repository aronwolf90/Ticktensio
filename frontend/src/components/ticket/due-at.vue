<template lang='pug'>
  details-date-time.due-at(
    @submit="submit",
    label="Due at",
    id="due-at",
    v-model="attributes['due-at']",
    :isSaving="isSaving",
    :isPersisted="isPersisted"
  )
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import detailsDateTime from 'components/right-aside/date-time'

export default {
  components: {
    detailsDateTime
  },
  props: ['issueId'],
  data () {
    return {
      isSaving: false,
      persistedDueAt: null,
      attributes: {
        'due-at': null
      }
    }
  },
  created () {
    this.$store.dispatch('initIssue', this.issueId).then(response => {
      this.persistedDueAt = Utils.attribute(response.data, 'due-at')
      this.attributes['due-at'] = Utils.attribute(response.data, 'due-at')
    })
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      return jqueryFuncs()
    }, 100)
  },
  computed: {
    issue () {
      return this.$store.getters.issue(this.issueId)
    },
    isPersisted () {
      return this.persistedDueAt === this.attributes['due-at']
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
        this.persistedDueAt = this
          .$store
          .getters
          .issue(this.issueId)
          .attributes['due-at']
      })
    }
  }
}
</script>
