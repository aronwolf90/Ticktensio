<template lang='pug'>
  b-form-group(
    :id="`input-group-${id}`",
    :label="label",
    :label-for="id"
  )
    b-form-input(
      :id="id",
      :value="value",
      :state="errorStatus(errorPath)",
      type="color",
      @input="input"
    )
    b-form-invalid-feedback(
      v-for="(error, index) in findErrors(errorPath)",
      :state="errorStatus(errorPath)",
      :key="index"
    )
      | {{ error.detail }}
</template>

<script>

export default {
  props: ['id', 'label', 'errors', 'error-path', 'value'],
  methods: {
    input (value) {
      this.$emit('input', value)
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
