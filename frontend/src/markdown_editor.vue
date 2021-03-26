<template lang='pug'>
  editor.markdown-editor(
    :initial-value="value",
    height="300px",
    preview-style="tab",
    @change="change",
    ref="editor"
  )
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'

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
