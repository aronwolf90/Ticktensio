<template lang='pug'>
  #wiki-content
    .pull-right.btn-group
      b-button.pull-right(variant="success", to="/administration/wiki/categories/new") New wikicategory
      b-button.pull-right(variant="success", to="/administration/wiki/pages/new") New wikipage
    .clearfix
    category(
      v-for='category in rootCategories',
      :category-id='category.id',
      :key='category.id'
    )

</template>

<script>
import Category from 'wiki_content/category'

export default {
  components: {
    Category
  },
  created () {
    this.$store.dispatch('initWikiCategories')
  },
  computed: {
    rootCategories () {
      return this.$store.getters.rootWikiCategories
    }
  }
}
</script>

<style lang='sass'>
#wiki-content
  .category-item
    padding-left: 32px
    position: relative
    &:before
      content: ""
      position: absolute
      border-top: 1px solid #000
      top: 11px
      width: 8px
      height: 0
      left: 12px
    &:after
      content: ""
      position: absolute
      left: 12px
      border-left: 1px solid #000
      height: 100%
      top: 3px
    &:last-child::after
      height: 8px

</style>
