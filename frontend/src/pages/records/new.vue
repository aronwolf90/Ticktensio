<template lang='pug'>
  records-form(@submit="updateRecord")
    b-button(type="submit", variant="success") Create record
    b-button.pull-right(variant="secondary", to="/administration/records") Cancel
</template>

<script>
import RecordsForm from 'components/records/form'
import store from 'store'

export default {
  components: {
    RecordsForm
  },
  async beforeRouteEnter (to, _from, next) {
    await store.dispatch('recordsForm/initializeNewForm')
    next()
  },
  methods: {
    async updateRecord () {
      if (await this.$store.dispatch('recordsForm/create')) {
        this.$router.push('/administration/records')
      }
    }
  }
}
</script>
