<template lang='pug'>
  search-select(
    :label="label",
    @input="input",
    @search="fetchOptions",
    :value="value",
    :options="wikiCategoryRefs",
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
      wikiCategoryRefs: []
    }
  },
  mounted () {
    this.fetchOptions('', () => null)
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    },
    fetchOptions (search, loading) {
      loading(true)
      this.$store.dispatch('get', `/api/v1/wiki_categories?query=${search}`, search).then(response => {
        this.wikiCategoryRefs = Utils.entryArrayToRef(response.data)
        loading(false)
      })
    },
    getOptionLabel (wikiCategoryRef) {
      const wikiCategory = this.$store.getters.entry(wikiCategoryRef)
      return `${Utils.attribute(wikiCategory, 'title')}`
    }
  }
}
</script>
