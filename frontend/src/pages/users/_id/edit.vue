<template lang='pug'>
  .users-edit
    b-form(@submit.prevent="onSubmit")
      form-input-avatar.avatar(
        id="avatar-input",
        v-model="form.relationships['user-avatar'].data",
        label="Avatar",
        api-url="/api/v1/user_avatars",
        :avatar-url="avatarUrl"
      )
      <br/>
      <br/>
      form-input-text(
        id="firstname-input",
        v-model="form.attributes.firstname",
        errorPath="relationships/firstname",
        :errors="errors",
        label="Firstname"
      )
      form-input-text(
        id="lastname-input",
        v-model="form.attributes.lastname",
        errorPath="relationships/lastname",
        :errors="errors",
        label="Lastname"
      )
      form-input-text(
        id="email-input",
        v-model="form.attributes.email",
        errorPath="relationships/email",
        :errors="errors",
        label="E-Mail"
      )
      form-input-text(
        id="telephone-number-input",
        v-model="form.attributes['telephone-number']",
        errorPath="relationships/attributes/telephone-number",
        :errors="errors",
        label="Telephone number"
      )
      btn-submit(:saving="saving") Update user
      // a.btn.btn-secondary.pull-right(href='/administration/users') Cancel
</template>

<script>
import FormInputAvatar from 'components/form-inputs/avatar'
import FormInputText from 'components/form-inputs/text'
import BtnSubmit from 'components/btn-submit'
import store from 'store'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    FormInputAvatar,
    FormInputText,
    BtnSubmit
  },
  data () {
    return {
      saving: false,
      userRef: null,
      errors: [],
      form: {
        attributes: {
          firstname: null,
          lastname: null,
          email: null,
          'telephone-number': null
        },
        relationships: {
          'user-avatar': {
            data: null
          }
        }
      }
    }
  },
  async beforeRouteEnter (to, _from, next) {
    const user = (await store.dispatch('get', `users/${to.params.id}`)).data
    next(vm => {
      vm.userRef = user
      vm.form.attributes.firstname = Utils.attribute(user, 'firstname')
      vm.form.attributes.lastname = Utils.attribute(user, 'lastname')
      vm.form.attributes.email = Utils.attribute(user, 'email')
      vm.form.attributes['telephone-number'] =
        Utils.attribute(user, 'telephone-number')
    })
  },
  computed: {
    user () {
      return this.$store.getters.entry(this.userRef)
    },
    avatarUrl () {
      return Utils.attribute(this.user, 'avatar-url')
    }
  },
  methods: {
    onSubmit () {
      this.saving = true
      this.$store.dispatch('update', { entry: this.user, payload: this.form }).then(() => {
        this.saving = false
        this.$router.go()
      }).catch(({ status, data }) => {
        this.saving = false
        this.errors = data.errors
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.select
  margin-left: -18px
</style>

<style lang='sass'>
.avatar
  img
    height: 260px
</style>
