<template lang='pug'>
  right-aside-item.details-date-time(:label="label", :label-for="id")
    template(v-slot:content="")
      b-form.details-date-time(@submit="submit")
        b-input-group.group
          datetimepicker(
            :id="id",
            placeholder="01-01-2020 00:00",
            :value="value",
            @input="$emit('input', $event)"
          )
          b-input-group-append
            b-button.fa.fa-spinner.fa-spin(v-if='isSaving')
            b-button(
              type="submit",
              variant="outline-secondary",
              v-else="",
              v-bind:class="{ persisted: isPersisted }"
            ) Ok
</template>

<script>
import Datetimepicker from './datetimepicker'
import RightAsideItem from 'components/right-aside-item'

export default {
  components: {
    Datetimepicker,
    RightAsideItem
  },
  props: {
    label: String,
    id: [String, Number],
    value: String,
    isSaving: {
      type: Boolean,
      default: false
    },
    isPersisted: {
      type: Boolean,
      default: true
    }
  },
  created () {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      return jqueryFuncs()
    }, 100)
  },
  methods: {
    submit (event) {
      event.preventDefault()
      this.$emit('submit')
    }
  }
}
</script>

<style lang='sass' scoped>
.details-date-time
  form
    margin-left: -12px
    .group
      position: unset
  input::placeholder
    color: rgba(191, 191, 191, 0.87)
  input:not(:focus)
    background-color: #f8f8f8
    border: none
    color: grey !important
    &+.input-group-append button.persisted[type="submit"]
      opacity: 0.3
      border: none
      &:hover
        background-color: #f8f8f8 !important
        color: grey !important
</style>
