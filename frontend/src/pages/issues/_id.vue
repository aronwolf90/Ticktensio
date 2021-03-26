<template lang='pug'>
  show-container(v-if='issue')
    show-body
      router-view(:issue-id='id')
      hr.divider
      comments(module="issuesShow")
      br
    right-aside
      assigen(:issue-id='id')
      board-list(:issue-ref='issueRef')
      project(:issue-ref='issueRef')
      complexity(:issue-id='id')
      due-at(:issue-id='id')
      deadline-at(:issue-id='id')
      labels(:issue-ref='issueRef')
      created-by(:issue-ref='issueRef')
      created-at(:issue-ref='issueRef')
</template>

<script>
import RightAside from 'components/right_aside'
import SpentTime from 'components/ticket/spent-time'
import Assigen from 'components/ticket/assigen'
import BoardList from 'components/ticket/board-list'
import Complexity from 'components/ticket/complexity'
import Comments from 'components/comments'
import ShowContainer from 'components/show-container'
import ShowBody from 'components/show-body'
import DueAt from 'components/ticket/due-at'
import DeadlineAt from 'components/ticket/deadline-at'
import Labels from 'components/ticket/labels'
import CreatedBy from 'components/ticket/created-by'
import CreatedAt from 'components/ticket/created-at'
import Project from 'components/ticket/project'
import store from 'store'
import issuesShow from 'store/modules/issues-show'

if (!store.hasModule('issuesShow')) {
  store.registerModule('issuesShow', issuesShow)
}

export default {
  props: ['id'],
  components: {
    SpentTime,
    BoardList,
    Assigen,
    Comments,
    Complexity,
    RightAside,
    ShowContainer,
    ShowBody,
    DueAt,
    DeadlineAt,
    Labels,
    CreatedBy,
    CreatedAt,
    Project
  },
  created () {
    this.$store.dispatch('issuesShow/fetch', this.id)
  },
  computed: {
    issueRef () {
      return { type: 'issues', id: this.id }
    },
    issue () {
      return this.$store.getters.entry(this.issueRef)
    }
  }
}
</script>
