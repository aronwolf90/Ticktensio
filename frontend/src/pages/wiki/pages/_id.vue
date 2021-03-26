<template lang='pug'>
  show-container(v-if='wikiPage')
    show-body
      router-view(:wiki-page-id='wikiPage.id')
    right-aside
      category(:wiki-page-id="wikiPageId")
</template>

<script>
import Category from 'wiki_page/category'
import RightAside from 'components/right_aside'
import ShowContainer from 'components/show-container'
import ShowBody from 'components/show-body'

export default {
  props: ['wikiPageId'],
  components: {
    Category,
    RightAside,
    ShowContainer,
    ShowBody
  },
  created () {
    this.$store.dispatch('initWikiPage', this.wikiPageId)
  },
  computed: {
    wikiPage () {
      return this.$store.getters.entry({ type: 'wiki-pages', id: this.wikiPageId })
    }
  }
}
</script>
