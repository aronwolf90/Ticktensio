<template lang='pug'>
  .documents
    b-button.pull-right(variant="success", :to="newDocumentPath") New document
    .clearfix
    b-list-group(flush="")
      b-list-group-item(
        v-for="document in documents",
        :href="document.attributes.url",
        target="_blank"
      )
        | {{ document.attributes.name }}
        b-button.pull-right(
          size="sm",
          variant="secondary",
          :to="`/administration/projects/${projectId}/documents/${document.id}/edit`"
        )
          .fa.fa-edit
</template>

<script>
import Folder from 'components/archive-content/folder'
import Document from 'components/archive-content/document'
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['project-id'],
  components: {
    Folder,
    Document
  },
  created () {
    this.fetch()
  },
  computed: {
    documents () {
      return this.$store.getters.projectDocuments(this.projectId)
    },
    newDocumentPath () {
      return `/administration/projects/${this.projectId}/documents/new`
    }
  },
  methods: {
    fetch () {
      this.$store.dispatch(
        'getProject',
        this.projectId
      ).then(response => {
        this.$store.dispatch(
          'getFolder',
          Utils.relationship(response.data, 'folder').id
        )
      })
    }
  },
  watch: {
    'projectId': 'fetch'
  }
}
</script>

<style lang='sass'>
#archive-content
  .archive-tree-item
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
