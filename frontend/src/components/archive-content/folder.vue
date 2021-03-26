<template lang='pug'>
  .folder.archive-tree-item
    .item
      .name.fa.fa-tags
        | {{ name }}&nbsp;&nbsp;
      router-link(:to='link')
        .fa.fa-edit
    .child-documents
      document(
        v-for='document in documents',
        :document-id='document.id',
        :key="document.key"
      )
    .child-folders
      folder(
        v-for='folder in folders',
        :folder-id='folder.id',
        :key='folder.id'
      )
</template>

<script>
import Document from './document'
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: [ 'folderId' ],
  name: 'folder',
  components: {
    Document
  },
  computed: {
    folder () {
      return this.$store.getters.entry({
        id: this.folderId,
        type: 'folders'
      })
    },
    folders () {
      return this.$store.getters.associatedEntries({
        entry: this.folder,
        name: 'folders'
      })
    },
    documents () {
      return this.$store.getters.associatedEntries({
        entry: this.folder,
        name: 'documents'
      })
    },
    name () {
      return Utils.attribute(this.folder, 'name')
    },
    link () {
      return `/administration/archive/folders/${this.folder.id}/edit`
    }
  }
}

</script>

<style lang='sass' scoped>
  .name
    font-weight: bold
  a
   color: black
   font-size: 12px;

</style>
