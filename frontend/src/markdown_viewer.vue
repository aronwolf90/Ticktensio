<template lang='pug'>
  viewer.markdown-viewer(:initial-value="value")
</template>

<script>
import { Viewer } from '@toast-ui/vue-editor'

export default {
  props: ['value'],
  components: {
    Viewer
  }
}
</script>

<style lang="sass">
.markdown-viewer
  @import 'codemirror/lib/codemirror.css'
  @import '@toast-ui/editor/dist/toastui-editor.css'
</style
