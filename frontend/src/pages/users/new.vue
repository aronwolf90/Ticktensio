<template lang='pug'>
  b-form(@submit.prevent="onSubmit")
    form-inputs-text(
      id="input-firstname",
      v-model="data.attributes.firstname",
      label="Firstname",
      error-path="attributes/firstname",
      :errors="errors"
    )
    form-inputs-text(
      id="input-lastname",
      v-model="data.attributes.lastname",
      label="Lastname",
      error-path="attributes/lastname",
      :errors="errors"
    )
    form-inputs-text(
      id="input-email",
      v-model="data.attributes.email",
      label="E-Mail",
      error-path="attributes/email",
      :errors="errors"
    )
    form-select-text(
      id="input-type",
      label="Type",
      v-model="data.attributes.type",
      :options="['Admin', 'Employee', 'Customer']",
      error-path="attributes/email",
      :errors="errors"
    )
    btn-submit(:saving="saving") Create user
    b-button.pull-right(variant="secondary", to='/administration/users') Cancel
</template>

<script>
import FormInputsText from 'components/form-inputs/text'
import FormSelectText from 'components/form-inputs/select'
import BtnSubmit from 'components/btn-submit'

export default {
  components: {
    FormInputsText,
    FormSelectText,
    BtnSubmit
  },
  data () {
    return {
      data: {
        attributes: {
          firstname: null,
          lastname: null,
          email: null,
          type: null
        }
      },
      errors: [],
      saving: false
    }
  },
  methods: {
    onSubmit () {
      this.saving = true
      this.$store.dispatch('createUser', this.data).then(() => {
        this.saving = false
        this.$router.push('/administration/users')
      }).catch(({ status, data }) => {
        this.saving = false
        this.errors = data.errors
      })
    }
  }
}
</script>
