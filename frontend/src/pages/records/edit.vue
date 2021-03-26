<template lang='pug'>
  records-form(@submit="updateRecord")
    b-button(type="submit", variant="success") Create record
    .btn-group.pull-right
      form-btn-destroy(:entry-ref="record", @destroy="destroy")
      b-button(variant="secondary", to="/administration/records") Cancel
</template>

<script>
import RecordsForm from 'components/records/form'
import FormBtnDestroy from 'components/form-btn-destroy'
import store from 'store'

export default {
  components: {
    RecordsForm,
    FormBtnDestroy
  },
  async beforeRouteEnter (to, _from, next) {
    await store.dispatch('recordsForm/initializeEditForm', to.params.id)
    next()
  },
  methods: {
    async updateRecord () {
      if (await this.$store.dispatch('recordsForm/update')) {
        this.$router.push('/administration/records')
      }
    },
    async destroy () {
      await this.$store.dispatch('destroy', this.record)
      this.$router.push('/administration/records')
    }
  },
  computed: {
    record () {
      return this.$store.getters['recordsForm/record']
    }
  }
}
</script>
