<template lang='pug'>
  search-select(
    :label="label",
    @input="input",
    @search="fetchOptions",
    :value="value",
    :options="folderRefs",
    :id="id",
    :errors="errors",
    :error-path="errorPath",
    :getOptionLabel="getOptionLabel",
    ref="searchSelect"
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
  data () {
    return {
      folderRefs: []
    }
  },
  mounted () {
    this.fetchOptions('', () => null)
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    },
    async fetchOptions (search, loading) {
      loading(true)
      const response = await this.$store.dispatch('get', `/api/v1/folders?query=${search}&filter[project_id]=null`, search)
      this.folderRefs = Utils.entryArrayToRef(response.data)
      loading(false)
    },
    getOptionLabel (folderRef) {
      const folder = this.$store.getters.entry(folderRef)
      return `${Utils.attribute(folder, 'name')}`
    }
  }
}
</script>
