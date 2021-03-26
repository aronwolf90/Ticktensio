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
    b-form-group(
      id="input-group-display-as",
      label="Display as",
      label-for="input-display-as"
    )
      b-form-select(
        v-model="value.attributes['display-as']",
        id="input-display-as"
      )
        option(value="list") List
        option(value="board") Board
    b-button(type="submit", variant="success") Save
</template>

<script>

export default {
  props: ['value', 'errors'],
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
