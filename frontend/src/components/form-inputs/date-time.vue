<template lang='pug'>
  b-form-group(
    :id="`input-group-${id}`",
    :label="label",
    :label-for="id"
  )
    datetimepicker(
      :id="id",
      :value="value",
      :state="errorStatus(errorPath)",
      type="text",
      @input="input",
      @update="input",
      :placeholder="placeholder",
      :required="required",
      ref="input"
    )
    b-form-invalid-feedback(
      v-for="(error, index) in findErrors(errorPath)",
      :state="errorStatus(errorPath)",
      :key="index"
    )
      | {{ error.detail }}
</template>

<script>
import Datetimepicker from 'components/datetimepicker'

export default {
  props: {
    id: String,
    label: String,
    errors: {
      type: Array,
      default: () => []
    },
    errorPath: String,
    value: String,
    placeholder: String,
    required: Boolean
  },
  components: {
    Datetimepicker
  },
  data () {
    return {
      elem: null
    }
  },
  created () {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      jqueryFuncs()
    }, 10)
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
