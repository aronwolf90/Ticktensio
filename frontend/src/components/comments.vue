<template lang='pug'>
  .comments
    .row.comment(v-for='comment in comments')
      .col-12
        markdown-viewer(:value='comment.attributes.content')
        hr.divider
    .row
      .col-12
        markdown-editor(
          v-model='newCommentData.attributes.content',
          ref='markdownEditor'
        )
        br
    .row
      .col-12
        .btn.btn-sm.btn-success(@click='comment') Comment

</template>

<script>
import MarkdownViewer from 'markdown_viewer'
import MarkdownEditor from 'markdown_editor'

export default {
  props: ['module'],
  components: {
    MarkdownViewer,
    MarkdownEditor
  },
  data () {
    return {
      newCommentData: {
        attributes: {
          content: ''
        },
        relationships: {
          project: {
            data: null
          },
          user: {
            data: null
          }
        }
      },
      editor: null
    }
  },
  computed: {
    comments () {
      return this.$store.getters[`${this.module}/comments`]
    }
  },
  methods: {
    comment () {
      if (!this.newCommentData.attributes.content) return
      this.$store.dispatch(`${this.module}/createComment`, this.newCommentData)
      this.$refs.markdownEditor.clear()
      this.newCommentData.attributes.content = ''
    }
  }
}
</script>
