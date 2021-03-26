<template lang='pug'>
  .contacts-index
    index-top-section(
      resource="contacts",
      new-text="New contact",
      :item-text-function="itemTextFunction"
    )

    br
    br

    ul.list-group.list-lines
      index-list-item(
        v-for="contact in contacts",
        resource="contacts",
        :entry-type="contact.type",
        :entry-id="contact.id",
        :text="contact.attributes.name",
        :editBtn="true",
        :key="contact.id"
      )
</template>

<script>
import IndexTopSection from 'components/index-top-section'
import IndexListItem from 'components/index-list-item'
import contactsIndex from 'store/modules/contacts-index'
import store from 'store'

if (!store.hasModule('contactsIndex')) {
  store.registerModule('contactsIndex', contactsIndex)
}

export default {
  components: {
    IndexTopSection,
    IndexListItem
  },
  created () {
    this.$store.dispatch('contactsIndex/fetch')
  },
  computed: {
    contacts () {
      return this.$store.getters['contactsIndex/contacts']
    }
  },
  methods: {
    itemTextFunction (contact) {
      return contact.attributes.name
    }
  }
}
</script>
