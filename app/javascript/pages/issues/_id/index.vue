<template lang='pug'>
  .show(v-if='issue')
    .header
      .btn-toolbar.float-right
        b-button.mr-1(variant='outline-dark', size='sm', :to='`${issueId}/edit`')
          .fa.fa-edit
        show-btn-destroy(
          :entry-ref="issue",
          @destroy='deleteIssue'
        )
          .fa.fa-trash
      h4 {{ title }}
    .body
      markdown-viewer(:value='description')
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import MarkdownViewer from 'markdown_viewer'
import ShowBtnDestroy from 'components/show-btn-destroy'

export default {
  props: ['issueId'],
  components: {
    MarkdownViewer,
    ShowBtnDestroy
  },
  mounted () {
    this.$store.dispatch('initIssue', this.issueId)
  },
  computed: {
    issue () {
      return this.$store.getters.entry({ type: 'issues', id: this.issueId })
    },
    title () {
      return Utils.attribute(this.issue, 'title')
    },
    description () {
      return Utils.attribute(this.issue, 'description')
    }
  },
  methods: {
    deleteIssue (event) {
      this.$store.dispatch('destroy', {
        entry: this.issue
      }).then(() => {
        this.$router.push('/administration/board_lists')
      })
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
