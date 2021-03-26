<template lang='pug'>
  .contacts-new
    contact-form(
      @onSubmit='onSubmit',
      submit-text="Create contact",
      :saving="saving"
    )
</template>

<script>
import ContactForm from 'contacts/form'

export default {
  components: {
    ContactForm
  },
  data () {
    return {
      saving: false
    }
  },
  methods: {
    onSubmit (payload) {
      this.saving = true
      this.$store.dispatch('createContact', payload).then(() => {
        this.$router.push('/administration/contacts')
        this.saving = false
      })
    }
  }
}
</script>
