<template lang='pug'>
  .category.category-item
    .title.fa.fa-tags
      | {{ title }}&nbsp;&nbsp
    router-link(:to='editLink')
      .fa.fa-edit
    .child-pages
      page(
        v-for='page in pages',
        :page-id='page.id',
        :key="page.key"
      )
    .child-categories
      category(
        v-for='category in categories',
        :category-id='category.id',
        :key='category.id'
      )
</template>

<script>
import Page from 'wiki_content/page'
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: [ 'categoryId' ],
  name: 'category',
  components: {
    Page
  },
  computed: {
    category () {
      return this.$store.getters.entry({
        id: this.categoryId,
        type: 'wiki-categories'
      })
    },
    categories () {
      return this.$store.getters.associatedEntries({
        entry: this.category,
        name: 'wiki-categories'
      })
    },
    pages () {
      return this.$store.getters.associatedEntries({
        entry: this.category,
        name: 'wiki-pages'
      })
    },
    title () {
      return Utils.attribute(this.category, 'title')
    },
    editLink () {
      return `/administration/wiki/categories/${this.categoryId}/edit`
    }
  }
}

</script>

<style lang='sass' scoped>
  .title
    font-weight: bold
  a
   color: black
   font-size: 12px;
</style>
