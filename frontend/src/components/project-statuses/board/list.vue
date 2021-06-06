<template lang='pug'>
list(
  v-model="projects",
  v-if="projectBoardList",
  @load-more="loadMore",
	:show-more="showMore",
  @change="change"
)
  template(v-slot:header="")
    .text.pull-left {{ name }}
    router-link.btn.btn-sm.btn-link.pull-right.text-muted(:to="editLink")
      .fa.fa-edit
    .clearfix

  template(v-slot:items="")
    project(
      v-for='project in projects',
      :key='project.id',
      :project-id="project.id",
      :id="`list-project-${project.id}`",
      class="list-project"
    )
</template>

<script>
import list from 'components/boards/list'
import draggable from 'vuedraggable'
import project from './project'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    draggable,
    project,
    list
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
