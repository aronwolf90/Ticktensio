<template lang='pug'>
  .card.column(v-if='projectBoardList')
    .card-header
      .text.pull-left {{ name }}
      router-link.btn.btn-sm.btn-link.pull-right.text-muted(:to="editLink")
        .fa.fa-edit

      .clearfix
    draggable.body(
      v-model="projects",
      :options="{group:'projects'}",
      @change="change"
    )
      project(
        v-for='project in projects',
        :key='project.id',
        :project-id="project.id",
        :id="`list-project-${project.id}`",
        class="list-project"
      )
    .more(v-if='showMore')
      .text(v-on:click.self='loadMore') Load more

</template>

<script>
import draggable from 'vuedraggable'
import project from './project'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    draggable,
    project
  },
  props: { 'project-board-list-id': { required: true } },
  computed: {
    projectBoardList () {
      return this.$store.getters.projectBoardList(this.projectBoardListId)
    },
    name () {
      return Utils.attribute(this.projectBoardList, 'name')
    },
    editLink () {
      return `/administration/project_board_lists/${this.projectBoardList.id}/edit`
    },
    loadMoreLink () {
      return this.$store.getters['projects-board/loadMoreLink'](this.projectBoardListId)
    },
    showMore () {
      return !!this.loadMoreLink
    },
    projects: {
      get () {
        return this.$store.getters['projects-board/projectBoardListProjects'](this.projectBoardList)
      },
      set (projects) {
        return this.$store.commit('projects-board/projectBoardListProjects',
          { projects, projectBoardList: this.projectBoardList })
      }
    }
  },
  methods: {
    destroy () {
      return this.$store.dispatch('destroyProjectBoardList', this.projectBoardList.id)
    },
    loadMore () {
      return this.$store.dispatch(
        'projects-board/loadMoreProjectForBoardListProjects',
        this.projectBoardList
      )
    },
    change (event) {
      if (!event.moved && !event.added) return
      let movedAdded = event.moved || event.added
      this.$store.dispatch('projects-board/moveProject', {
        projectBoardList: this.projectBoardList,
        project: movedAdded.element,
        ordinalNumber: movedAdded.newIndex
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
