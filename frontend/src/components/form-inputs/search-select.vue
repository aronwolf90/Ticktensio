<template lang='pug'>
  span
    b-form-group(
      :id="`input-group-${id}`",
      :label="label",
      v-if="label",
      v-bind:class="{ error: errorStatus == false }"
    )
      v-select(
        @input='input',
        :value='value',
        :options='options',
        @search="search",
        :getOptionLabel="getOptionLabel",
        :inputId="id",
      )
      b-form-invalid-feedback(
        v-for="(error, index) in selectedErrors",
        :state="errorStatus",
        :key="index"
      )
        | {{ error.detail }}
    template(v-else="")
      v-select(
        @input="input",
        :value="value",
        :options='options',
        @search="search",
      )
      b-form-invalid-feedback(
        v-for="(error, index) in selectedErrors",
        :state="errorStatus",
        :key="index"
      )
          | {{ error.detail }}
</template>

<script>
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  props: {
    value: {
      type: Object,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    id: {
      type: String,
      default: String
    },
    errors: {
      type: Array,
      default () {
        return []
      }
    },
    errorPath: {
      type: String,
      default: ''
    },
    getOptionLabel: {
      type: Function
    }
  },
  components: {
    VSelect
  },
  computed: {
    selectedErrors () {
      return this.errors.filter(error => {
        return error.source.pointer.includes(this.errorPath)
      })
        .filter((error, index, self) => {
          return self.findIndex(value => value.detail === error.detail) === index
        })
    },
    errorStatus () {
      return this.selectedErrors.length === 0 ? null : false
    }
  },
  methods: {
    search (search, loading) {
      this.$emit('search', search, loading)
    },
    input (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang='sass'>
  .error
    .vs__dropdown-toggle
      border: 1px solid red
</style>
