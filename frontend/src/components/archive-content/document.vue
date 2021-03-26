<template lang='pug'>
  .document.archive-tree-item
    a(:href='link', target="_blank")
      .fa.fa-file-text-o
        | {{ name }}&nbsp;&nbsp;
    router-link.edit-btn(:to='editLink')
      .fa.fa-edit
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['documentId'],
  computed: {
    document () {
      return this.$store.getters.entry({
        id: this.documentId,
        type: 'documents'
      })
    },
    name () {
      return Utils.attribute(this.document, 'name')
    },
    link () {
      return Utils.attribute(this.document, 'url')
    },
    editLink () {
      return `archive/documents/${this.document.id}/edit`
    }
  }
}

</script>

<style lang='sass' scoped>
.document
  a
    color: black
  .edit-btn
    font-size: 12px

</style>
