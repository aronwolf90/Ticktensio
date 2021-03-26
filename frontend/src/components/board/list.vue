<template lang='pug'>
  .card.column(v-if='boardList')
    .card-header
      .text.pull-left {{ name }}
      router-link.btn.btn-sm.btn-outline-secondary.pull-right(
        :to="`board_lists/${listId}/issues/new`"
      )
        .fa.fa-plus
      router-link.btn.btn-sm.btn-link.pull-right.text-muted(:to="editLink")
        .fa.fa-edit
      div.pull-right(v-if="showComplexity")
        b-badge {{ complexity }}
      .clearfix
    draggable.body(v-model="issues", :options="{group:'issues'}")
      issue(
        v-for='issue in issues',
        :key='issue.id',
        :issue-id="issue.id",
        :board-list-id="boardList.id",
        :id="`list-issue-${issue.id}`",
        class="list-issue"
      )
    .more(v-if='showMore')
      .text(v-on:click.self='loadMore') Load more

</template>

<script>
import draggable from 'vuedraggable'
import issue from './issue'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    draggable,
    'issue': issue
  },
  props: { 'list-id': { required: true } },
  created () {
    this.$store.dispatch('loadRelationship', {
      entry: this.boardList,
      name: 'issues'
    })
  },
  computed: {
    boardList () {
      return this.$store.getters.entry({ type: 'board-lists', id: this.listId })
    },
    name () {
      return Utils.attribute(this.boardList, 'name')
    },
    addLink () {
      return `board_lists/${this.boardList.id}/issues/new`
    },
    editLink () {
      return `board_lists/${this.boardList.id}/edit`
    },
    showMore () {
      if (!this.boardList) return false
      if (!this.boardList.relationships) return false
      if (!this.boardList.relationships['issues']) return false
      if (!this.boardList.relationships['issues'].links) return false
      return !!this.boardList.relationships['issues'].links.next
    },
    complexity () {
      return Utils.attribute(this.boardList, 'complexity')
    },
    showComplexity () {
      return Utils.attribute(this.boardList, 'complexity') &&
        Utils.attribute(this.boardList, 'complexity') !== '0.0'
    },
    issues: {
      get () {
        return this.$store.getters.associatedEntries({ entry: this.boardList, name: 'issues' })
      },
      set (issues) {
        return this.$store.dispatch('board/setBoardListIssues', { issues, boardList: this.boardList })
      }
    }
  },
  methods: {
    destroy () {
      return this.$store.dispatch('destroy', { entry: this.boardList })
    },
    loadMore () {
      this.$store.dispatch('loadAssociationNextPageAccumulative', {
        entry: this.boardList,
        association: 'issues'
      })
    }
  }
}
</script>

<style lang='sass' scoped>
  .column
    display: inline-block
    vertical-align: text-top
    margin-right: 13px
    width: 300px
    .body
      background-color: #fbfbfb
      min-height: 20px
      .issue
        margin: 5px
        box-shadow: 0 1px 2px rgba(186,186,186,0.5)
        .issue-body
          padding: 0.5rem
          .text
            overflow: hidden
            text-overflow: ellipsis
    .more
      text-align: center
      .text
        display: inline-block
        &:hover
          text-decoration: underline
          cursor: pointer
</style>
