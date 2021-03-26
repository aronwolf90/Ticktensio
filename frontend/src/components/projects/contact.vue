<template lang='pug'>
  right-aside-item.spent-time
    template(v-slot:header="")
      details-select-header-input(
      v-model="idValue",
      :editMode.sync="idEditMode",
      :options="contactOptions",
      @submit="submitId",
      :getOptionLabel="getContactLabel",
      id="contact-id",
      text="Contact",
      :link="contactLink",
      @search="searchForContact"
    )
    template(v-slot:content="")
      details-string-input(
        v-model="nameValue",
        :editMode.sync="nameEditMode",
        placeholder="Name",
        @submit="submitName",
        id="contact-name"
      )
      details-string-input(
        v-model="telephoneNumberValue",
        :editMode.sync="telephoneNumberEditMode",
        placeholder="Telephone number",
        @submit="submitTelephoneNumber",
        id="contact-telephone-number"
      )
      details-string-input(
        v-model="emailValue",
        :editMode.sync="emailEditMode",
        placeholder="E-Mail"
        @submit="submitEmail",
        id="contact-email"
      )
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import DetailsStringInput from 'components/details-string-input'
import DetailsSelectHeaderInput from 'components/details-select-header-input'
import RightAsideItem from 'components/right-aside-item'

export default {
  components: {
    DetailsStringInput,
    DetailsSelectHeaderInput,
    RightAsideItem
  },
  computed: {
    contact () {
      return this.$store.getters['projectsShow/contact']
    },
    project () {
      return this.$store.getters['projectsShow/project']
    },
    contactId () {
      if (!this.contact) return
      return this.contact.id
    },
    contactLink () {
      return `/administration/contacts/${this.contactId}`
    },
    contactOptions () {
      return this.$store.getters['projectsShow/contacts']
    },
    idValue: {
      get () {
        return this.$store.getters['projectsShow/contactIdValue']
      },
      set (value) {
        this.$store.commit('projectsShow/contactIdValue', value)
      }
    },
    idEditMode: {
      get () {
        return this.$store.getters['projectsShow/contactIdEditMode']
      },
      set (value) {
        this.$store.commit('projectsShow/contactIdEditMode', value)
      }
    },
    nameValue: {
      get () {
        return this.$store.getters['projectsShow/contactNameValue']
      },
      set (value) {
        this.$store.commit('projectsShow/contactNameValue', value)
      }
    },
    nameEditMode: {
      get () {
        return this.$store.getters['projectsShow/contactNameEditMode']
      },
      set (value) {
        this.$store.commit('projectsShow/contactNameEditMode', value)
      }
    },
    telephoneNumberValue: {
      get () {
        return this.$store.getters['projectsShow/contactTelephoneNumberValue']
      },
      set (value) {
        this.$store.commit('projectsShow/contactTelephoneNumberValue', value)
      }
    },
    telephoneNumberEditMode: {
      get () {
        return this.$store.getters['projectsShow/contactTelephoneNumberEditMode']
      },
      set (value) {
        this.$store.commit('projectsShow/contactTelephoneNumberEditMode', value)
      }
    },
    emailValue: {
      get () {
        return this.$store.getters['projectsShow/contactEmailValue']
      },
      set (value) {
        this.$store.commit('projectsShow/contactEmailValue', value)
      }
    },
    emailEditMode: {
      get () {
        return this.$store.getters['projectsShow/contactEmailEditMode']
      },
      set (value) {
        this.$store.commit('projectsShow/contactEmailEditMode', value)
      }
    }
  },
  methods: {
    async searchForContact (search, loading) {
      loading(true)
      await this.$store.dispatch('projectsShow/searchForContact', search)
      loading(false)
    },
    getContactLabel (contactRef) {
      return Utils.attribute(this.$store.getters.entry(contactRef), 'name')
    },
    submitId () {
      this.$store.dispatch('projectsShow/changeContact')
    },
    submitName () {
      this.$store.dispatch('projectsShow/updateContactAttributes', {
        name: this.nameValue
      }).then(() => {
        this.nameEditMode = false
      })
    },
    submitTelephoneNumber () {
      this.$store.dispatch('projectsShow/updateContactAttributes', {
        telephone: this.telephoneNumberValue
      }).then(() => {
        this.telephoneNumberEditMode = false
      })
    },
    submitEmail () {
      this.$store.dispatch('projectsShow/updateContactAttributes', {
        email: this.emailValue
      }).then(() => {
        this.emailEditMode = false
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.spent-time
  .header-text
    margin-bottom: 5px
</style>
