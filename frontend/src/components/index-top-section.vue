<template lang='pug'>
  .d-flex.flex-row
    .flex-fill.mr-2
      index-search-section(
        :resource="resource",
        :itemTextFunction="itemTextFunction"
      )
    slot(name="btn-new")
      router-link.btn.btn-success(:to="`/administration/${resource}/new`")
        | {{ newText }}
</template>

<script>
import IndexSearchSection from './index-search-section'
import IndexSearchSectionItem from './index-search-section-item'

export default {
  components: {
    IndexSearchSection,
    IndexSearchSectionItem
  },
  data () {
    return {
      searchText: '',
      focused: false
    }
  },
  props: [
    'resource',
    'itemTextFunction',
    'newText'
  ]
}
</script>
