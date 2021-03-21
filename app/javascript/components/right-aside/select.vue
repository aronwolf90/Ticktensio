<template lang='pug'>
  .right-aside-select
    right-aside-item(:label="label")
      template(v-slot:content="")
        .select
          basic-select(
            :options="options",
            :selected-option="item",
            placeholder="select item",
            @select="select",
            @searchchange="searchchange"
          )
</template>

<script>
import { BasicSelect } from 'vue-search-select'
import RightAsideItem from 'components/right-aside-item'

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
.select
  margin-left: -18px
  margin-top: -4px;
</style>

<style lang='sass'>
.right-aside-select
  .dropdown
    background-color: #f8f8f8 !important
    border: none !important
    color: grey !important
</style>
