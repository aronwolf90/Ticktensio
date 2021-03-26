<template lang='pug'>
  #archive-content
    .pull-right.btn-group
      b-button.pull-right(variant="success", to="/administration/archive/folders/new") New folder
      b-button.pull-right(variant="success", to="/administration/archive/documents/new") New document
    .clearfix
    folder(
      v-for='folder in rootFolders',
      :folder-id='folder.id',
      :key='folder.id'
    )

</template>

<script>
import Folder from 'components/archive-content/folder'
import store from 'store'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    Folder
  },
  async beforeRouteEnter (to, _from, next) {
    await store.dispatch('getArchiveFolders')
    next()
  },
  computed: {
    rootFolders () {
      return this.$store.getters.rootFolders.filter(folder => {
        return !Utils.relationship(folder, 'project')
      })
    }
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
