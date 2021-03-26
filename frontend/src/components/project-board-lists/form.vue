<template lang='pug'>
  b-form(@submit="submit")
    b-form-group(
      id="input-group-name",
      label="Name",
      label-for="input-name"
    )
      b-form-input(
        id="input-name",
        v-model="value.attributes.name",
        :state="errorStatus('attributes/name')",
        type="text"
      )
      b-form-invalid-feedback(
        v-for="(error, index) in findErrors('attributes/name')",
        :state="errorStatus('attributes/name')",
        :key="index"
      )
        | {{ error.detail }}
    b-button(type="submit", variant="success") Save
    b-button-group.pull-right
      b-button(
        variant="danger",
        @click="$emit('destroy')",
        v-if="showDestroyBtn",
        :disabled="disableDestroyBtn"
      ) Destroy
      b-button(
        variant="secondary",
        :to="cancelPath"
      ) Cancel
</template>

<script>

export default {
  props: [
    'value',
    'errors',
    'cancel-path',
    'show-destroy-btn',
    'disable-destroy-btn'
  ],
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()

      this.$emit('submit')
    },
    errorStatus (pointer) {
      let errors = this.findErrors(pointer)
      return errors.length === 0 ? null : false
    },
    findErrors (pointer) {
      return this.errors.filter(error => {
        return error.source.pointer.includes(pointer)
      })
        .filter((error, index, self) => {
          return self.findIndex(value => value.detail === error.detail) === index
        })
    }
  }
}
</script>
