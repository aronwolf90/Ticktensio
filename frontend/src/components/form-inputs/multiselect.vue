<template lang='pug'>
  b-form-group(
    :id="`input-group-${id}`",
    :label="label",
    :label-for="id"
  )
    v-select(
      :inputId="id",
      multiple="",
      :value="value",
      :options="options",
      :getOptionLabel="getLabel",
      @input="input"
    )
      template(#selected-option-container="{ option, deselect, multiple, disabled }")
        .vs__selected.text-white(
          v-bind:style="{ 'background-color': getColor(option) }"
        )
          .font-weight-bold {{ getLabel(option) }}&nbsp;
          button.vs__deselect
            .fa.fa-times.text-white(@click="deselect(option)")
    b-form-invalid-feedback(
      v-for="(error, index) in findErrors(errorPath)",
      :state="errorStatus(errorPath)",
      :key="index"
    )
      | {{ error.detail }}
</template>

<script>
import VSelect from 'vue-select'

export default {
  components: {
    VSelect
  },
  props: [
    'id', 'label', 'errors', 'error-path',
    'value', 'getLabel', 'options', 'getColor'
  ],
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
