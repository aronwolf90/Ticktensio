<template lang='pug'>
  b-form(@submit="onSubmit")
    .d-flex.flex-column.flex-md-row
      .d-flex.justify-content-center
        form-input-avatar.mr-4(
          id="avatar",
          api-url="/api/v1/contact_avatars",
          @change="changeFile",
          :avatar-url="avatarUrl"
        )
      .flex-md-fill
        form-input-text(
          id="input-name",
          label="Name:",
          placeholder="Lastname, Name",
          v-model="form.name"
        )
        form-input-text(
          id="input-group-telephone",
          label="Telephone:",
          v-model="form.telephone"
        )
        form-input-text(
          id="input-group-mobile",
          label="Mobile:",
          v-model="form.mobile"
        )
        form-input-text(
          id="input-group-fax",
          label="Fax:",
          v-model="form.fax"
        )
    br
    markdown-editor(
      :value='description',
      v-on:valueChange='setDescription'
    )
    br
    hr.divider
    .row
      .col-4
        form-input-text(
          id="input-group-street",
          label="Street:",
          v-model="form.street"
        )
      .col-4
        form-input-text(
          id="input-group-number",
          label="Number:",
          v-model="form.number"
        )
      .col-4
        form-input-text(
          id="input-group-zip",
          label="Zip:",
          v-model="form.zip"
        )
    .row
      .col-4
        form-input-text(
          id="input-group-city",
          label="City:",
          v-model="form.city"
        )
      .col-4
        form-input-text(
          id="input-group-country",
          label="Country:",
          v-model="form.country"
        )
    btn-submit(:saving="saving") {{ submitText }}
    b-button.pull-right(variant="secondary", to='/administration/contacts') Cancel
    br
    br
</template>

<script>
import MarkdownEditor from '../markdown_editor'
import FormInputAvatar from 'components/form-inputs/avatar'
import FormInputText from 'components/form-inputs/text'
import BtnSubmit from 'components/btn-submit'

export default {
  components: {
    MarkdownEditor,
    FormInputAvatar,
    FormInputText,
    BtnSubmit
  },
  props: [
    'name',
    'description',
    'telephone',
    'mobile',
    'fax',
    'street',
    'number',
    'zip',
    'city',
    'country',
    'avatar-url',
    'submit-text',
    'saving'
  ],
  data () {
    return {
      form: {
        name: null,
        description: null,
        telephone: null,
        mobile: null,
        fax: null,
        Street: null,
        number: null,
        zip: null,
        city: null,
        country: null
      },
      contactAvatar: null
    }
  },
  mounted () {
    this.form.name = this.name
    this.form.description = this.description
    this.form.telephone = this.telephone
    this.form.mobile = this.mobile
    this.form.fax = this.fax
    this.form.street = this.street
    this.form.number = this.number
    this.form.zip = this.zip
    this.form.city = this.city
    this.form.country = this.country
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()

      let payload = {
        attributes: {
          name: this.form.name,
          description: this.form.description,
          telephone: this.form.telephone,
          mobile: this.form.mobile,
          fax: this.form.fax,
          'address-street': this.form.street,
          'address-number': this.form.number,
          'address-zip': this.form.zip,
          'address-city': this.form.city,
          'address-country': this.form.country
        }
      }
      if (this.contactAvatar) {
        payload.attributes['contact-avatar-id'] = this.contactAvatar.id
      }
      this.$emit('onSubmit', payload)
    },
    setDescription (value) {
      this.form.description = value
    },
    changeFile (response) {
      this.contactAvatar = response
    }
  }
}
</script>
