<template lang='pug'>
  viewer(:initial-value="value")
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import { Viewer } from '@toast-ui/vue-editor'

export default {
  props: ['value'],
  components: {
    Viewer
  }
}
</script>
