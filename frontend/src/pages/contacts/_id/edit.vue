<template lang='pug'>
  .contacts-edit
    contact-form(
      @onSubmit="onSubmit",
      v-if="contact",
      :name="name",
      :description="description",
      :telephone="telephone",
      :mobile="mobile",
      :fax="fax",
      :street="street",
      :number="number",
      :zip="zip",
      :city="city",
      :country="country",
      :avatar-url="avatarUrl",
      submit-text="Update contact",
      :saving="saving"
    )
</template>

<script>
import ContactForm from 'contacts/form'
import store from 'store'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    ContactForm
  },
  props: [
    'contactId'
  ],
  data () {
    return {
      result: null,
      saving: false
    }
  },
  async beforeRouteEnter (to, from, next) {
    const result = await store.dispatch('contact', to.params.contactId)
    next(vm => (vm.result = result))
  },
  methods: {
    onSubmit (payload) {
      this.saving = true
      this.$store.dispatch('updateContact', {
        entry: this.contact,
        payload
      }).then(() => {
        this.$router.push(`/administration/contacts/${this.contactId}`)
        this.saving = false
      })
    }
  },
  computed: {
    contact () {
      if (!this.result) return
      return this.$store.getters.entry({
        type: this.result.data.type,
        id: this.result.data.id
      })
    },
    name () {
      return Utils.attribute(this.contact, 'name')
    },
    description () {
      return Utils.attribute(this.contact, 'description')
    },
    telephone () {
      return Utils.attribute(this.contact, 'telephone')
    },
    mobile () {
      return Utils.attribute(this.contact, 'mobile')
    },
    fax () {
      return Utils.attribute(this.contact, 'fax')
    },
    avatar () {
      return Utils.attribute(this.contact, 'avatar')
    },
    street () {
      return Utils.attribute(this.contact, 'address-street')
    },
    number () {
      return Utils.attribute(this.contact, 'address-number')
    },
    city () {
      return Utils.attribute(this.contact, 'address-city')
    },
    zip () {
      return Utils.attribute(this.contact, 'address-zip')
    },
    country () {
      return Utils.attribute(this.contact, 'address-country')
    },
    avatarUrl () {
      return Utils.attribute(this.contact, 'avatar-url')
    }
  }
}
</script>
