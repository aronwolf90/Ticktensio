<template lang='pug'>
  search-select(
    :label="label",
    @input="input",
    @search="fetchOptions",
    :value="value",
    :options="options",
    :id="id",
    :errors="errors",
    :error-path="errorPath",
    :getOptionLabel="getOptionLabel"
  )
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import SearchSelect from 'components/form-inputs/search-select'

export default {
  components: {
    SearchSelect
  },
  props: {
    id: String,
    value: {
      type: Object,
      default: null
    },
    label: {
      type: String,
      default: ''
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
    }
  },
  computed: {
    options () {
      return Utils.entryArrayToRef(this.$store.getters.collection('projects'))
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    },
    fetchOptions (search, loading) {
      loading(true)
      this.$store.dispatch('searchProject', search).then(() => {
        loading(false)
      })
    },
    getOptionLabel (projectRef) {
      console.log('hiiii')
      const project = this.$store.getters.entry(projectRef)
      return `${Utils.attribute(project, 'name')}`
    }
  }
}
</script>
