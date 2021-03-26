<template lang='pug'>
  .page.category-item
    router-link(:to='link')
      .fa.fa-file-text-o
        | {{this.title }}
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['pageId'],
  computed: {
    page () {
      return this.$store.getters.entry({
        id: this.pageId,
        type: 'wiki-pages'
      })
    },
    title () {
      return Utils.attribute(this.page, 'title')
    },
    link () {
      return `/administration/wiki/pages/${this.pageId}`
    }
  }
}

</script>

<style lang='sass' scoped>
 a
   color: black
</style>
