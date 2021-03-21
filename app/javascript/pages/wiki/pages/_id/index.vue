<template lang='pug'>
  .show(v-if='wikiPage')
    .header
      .btn-toolbox.float-right
        b-button.mr-1(
          variant='outline-dark',
          size='sm',
          :to="`${wikiPageId}/edit`"
        )
          .fa.fa-edit
        show-btn-destroy(
          @destroy="deleteWikiPage",
          :entry-ref="wikiPage",
        )
      h4 {{ title }}
    .body
      markdown-viewer(:value='content')
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import MarkdownViewer from 'markdown_viewer'
import ShowBtnDestroy from 'components/show-btn-destroy'

export default {
  props: ['wikiPageId'],
  components: {
    MarkdownViewer,
    ShowBtnDestroy
  },
  mounted () {
    this.$store.dispatch('initWikiPage', this.wikiPageId)
  },
  computed: {
    wikiPage () {
      return this.$store.getters.entry({ type: 'wiki-pages', id: this.wikiPageId })
    },
    title () {
      return Utils.attribute(this.wikiPage, 'title')
    },
    content () {
      return Utils.attribute(this.wikiPage, 'content')
    }
  },
  methods: {
    async deleteWikiPage () {
      await this.$store.dispatch('destroy', this.wikiPage)
      this.$router.push('/administration/wiki')
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
