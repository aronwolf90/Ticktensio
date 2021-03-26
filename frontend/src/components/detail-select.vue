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
import RightAsideItem from 'components/right-aside-item'

export default {
  props: ['item', 'options', 'label'],
  data () {
    return { searchText: '' }
  },
  methods: {
    select (item) { this.$emit('select', item) }
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
</style>

<style lang='sass'>
.detail-select .dropdown
  background-color: #f8f8f8 !important
  border: none !important
  color: grey !important
</style>
