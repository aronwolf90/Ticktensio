<template lang='pug'>
  editor.markdown-editor(
    :initial-value="value",
    initial-edit-type="wysiwyg",
    min-height="300px",
    height="auto",
    preview-style="tab",
    @change="change",
    ref="editor"
  )
</template>

<script>
import { Editor } from '@toast-ui/vue-editor'

export default {
  props: ['value'],
  components: {
    Editor
  },
  methods: {
    clear () {
      this.$refs.editor.invoke('setMarkdown', '')
    },
    change () {
      const text = this.$refs.editor.invoke('getMarkdown')
      this.$emit('input', text)
    }
  }
}
</script>

<style lang='sass'>
.markdown-editor
  @import 'codemirror/lib/codemirror.css'
  @import '@toast-ui/editor/dist/toastui-editor.css'
  .CodeMirror-sizer
    min-height: 124px !important
</style>
