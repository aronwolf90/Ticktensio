<template lang='pug'>
  #contact(v-if='contact')
    .container-fluid
      .d-md-flex.flex-row
        .right.ml-md-4.order-1.w-100
          .pull-right
            b-button-toolbar
              btn-edit.mr-1(
                base-path="/administration/contacts",
                :entry-type="contact.type",
                :entry-id="contact.id"
              )
              show-btn-destroy(
                @destroy="destroyContact",
                :entry-ref="contact",
              )
          h4 {{ name }}
          .description {{ description }}
        .left.order-0
          img.avatar.img-thumbnail.w-100(:src="avatarUrl")
          br
          br
          div Tel: {{ telephone }}
          div Mobile: {{ mobile }}
          div Fax: {{ fax }}
          hr.divider
          div {{ street }} {{ number }}
          div {{ zip }} {{ city }}
          div {{ country }}
</template>

<script>
import BtnEdit from 'components/btn-edit'
import ShowBtnDestroy from 'components/show-btn-destroy'
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['contactId'],
  components: {
    BtnEdit,
    ShowBtnDestroy
  },
  mounted () {
    this.$store.dispatch('get', `contacts/${this.contactId}`)
  },
  computed: {
    contact () {
      return this.$store.getters.entry({
        type: 'contacts',
        id: this.contactId
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
    avatarUrl () {
      return Utils.attribute(this.contact, 'avatar-url')
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
    }
  },
  methods: {
    destroyContact () {
      this.$store.dispatch('destroy', this.contact).then(() => {
        this.$router.push('/administration/contacts')
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.avatar
  max-width: 400px
</style>
