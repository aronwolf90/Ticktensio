<template lang='pug'>
  b-form-group(
    id="input-group-${id}",
    :label="label",
    :label-for="id"
  )
    b-form-select(
      :id="id",
      :value="value",
      :options="options",
      :state="errorStatus(errorPath)",
      @input="input"
    )
</template>

<script>
export default {
  props: ['id', 'errors', 'error-path', 'label', 'options', 'value'],
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
