<template lang='pug'>
  b-form(@submit="submit", v-if="user")
    b-form-group(
      id="input-group-type",
      label="Type",
      label-for="input-type"
    )
      b-form-select(
        id="input-type",
        required="",
        v-model="data.attributes.type"
      )
        option(value="Admin") Admin
        option(value="Employee") Employee
        option(value="Customer") Customer
    b-form-checkbox(
      id="input-active",
      required="",
      v-model="data.attributes.active"
    ) Active
    br
    b-button(type="submit", variant="success") Update configuration
    form-btn-destroy.pull-right(
      :entry-ref="user",
      @destroy="destroy",
      v-if="user.attributes['records-count'] == 0"
    ) Destroy
    b-button.pull-right(
      variant="danger",
      v-b-modal.warning-modal="",
      v-else=""
    ) Destroy
    b-modal(id="warning-modal", title="User will only be disabled", header-bg-variant="warning")
      p
        | The user has booked time on tickes, so it can not be removed. It will only
        | disabled if you continue.
      template(v-slot:modal-footer="")
        .w-100
          b-button(
            variant="primary",
            class="float-left",
            @click="$bvModal.hide('warning-modal')"
          ) Close
          b-button.pull-right(variant="success", @click="destroy") Continue
</template>

<script>
import FormBtnDestroy from 'components/form-btn-destroy'

export default {
  props: ['userId'],
  components: {
    FormBtnDestroy
  },
  data () {
    return {
      data: {
        attributes: {
          type: null,
          active: null
        }
      }
    }
  },
  created () {
    this.$store.dispatch('getUser', this.userId).then(response => {
      this.data.attributes.type = response.data.attributes.type
      this.data.attributes.active = response.data.attributes.active
    })
  },
  computed: {
    user () {
      return this.$store.getters.getUser(this.userId)
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()

      this.$store.dispatch('updateUserConfiguration', { user: this.user, payload: this.data }).then(() => {
        location.reload()
      })
    },
    async destroy (event) {
      await this.$store.dispatch('destroyUser', this.user)
      this.$router.push('/administration/users')
    }
  }
}
</script>
