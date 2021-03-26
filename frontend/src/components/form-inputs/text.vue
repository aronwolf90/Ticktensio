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
      type="text",
      @input="input",
      :placeholder="placeholder"
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
  props: {
    id: String,
    label: String,
    errors: Array,
    errorPath: String,
    value: String,
    placeholder: String
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    },
    errorStatus (pointer) {
      if (!pointer) return null

      let errors = this.findErrors(pointer)
      return errors.length === 0 ? null : false
    },
    findErrors (pointer) {
      if (!pointer) return []

      return (this.errors || []).filter(error => {
        return error.source.pointer.includes(pointer)
      })
        .filter((error, index, self) => {
          return self.findIndex(value => value.detail === error.detail) === index
        })
    }
  }
}
</script>
