<template lang='pug'>
  right-aside-select(
    id='category',
    :label='"Category"',
    :options='options',
    :item='item',
    @select="onSelect"
  )
</template>

<script>
import Select from 'components/right-aside/select'

export default {
  props: ['wikiPageId'],
  data () {
    return {
      searchText: ''
    }
  },
  created () {
    this.$store.dispatch('initWikiCategories')
  },
  computed: {
    wikiCategories () {
      return this.$store.getters.wikiCategories
    },
    options () {
      return this.wikiCategories.map((category) => {
        return {
          value: category.id,
          text: category.attributes.title
        }
      })
    },
    wikiPage () {
      return this.$store.getters.entry({
        type: 'wiki-pages',
        id: this.wikiPageId
      })
    },
    wikiCategory () {
      return this.$store.getters.associatedEntry({
        entry: this.wikiPage,
        name: 'wiki-category'
      })
    },
    item: {
      get () {
        if (!this.wikiCategory) return
        return {
          value: this.wikiCategory.id,
          text: this.wikiCategory.attributes.title
        }
      }
    }
  },
  methods: {
    onSelect (item) {
      console.log(this.wikiPage)
      this.$store.dispatch('changeWikiPageToCategoryReference', {
        page: this.wikiPage,
        category: this.$store.getters.entry({
          type: 'wiki-categories',
          id: item.value
        })
      })
    }
  },
  components: {
    'right-aside-select': Select
  }
}
</script>
