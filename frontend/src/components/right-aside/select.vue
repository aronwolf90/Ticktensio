<template lang='pug'>
  right-aside-item.detail-select(
    :label="label"
  )
    template(v-slot:content="")
      .select
        basic-select(
          :options="options",
          :selected-option="item",
          placeholder="select item",
          @select="select"
        )
</template>

<script>
import { BasicSelect } from 'vue-search-select'
import RightAsideItem from 'components/right-aside/item'
import 'vue-search-select/dist/VueSearchSelect.css'

export default {
  props: ['item', 'options', 'label'],
  data () {
    return { searchText: '' }
  },
  methods: {
    select (item) { this.$emit('select', item) },
    searchchange (text) { this.$emit('search', text) }
  },
  components: {
    BasicSelect,
    RightAsideItem
  }
}
</script>

<style lang='sass' scoped>
//.select
//  margin-left: -$right-aside-margin - 5px
</style>

<style lang='sass'>
.detail-select
  .select
    .ui.selection.dropdown.search
      padding-left: 0
      input.search
        left: 0
        padding-left: 0
      .menu
        left: -$right-aside-margin
        width: calc(100% + #{$right-aside-margin - 2px})
        .item
          padding-left: $right-aside-margin !important  
.detail-select .dropdown
  background-color: #f8f8f8 !important
  border: none !important
  color: grey !important
</style>
