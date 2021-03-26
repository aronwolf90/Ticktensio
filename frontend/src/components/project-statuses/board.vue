<template lang='pug'>
  draggable.body.projects-board-body(
    v-model="projectBoardLists",
    @change="change"
  )
    list(
      v-for='projectBoardList in projectBoardLists',
      :key='projectBoardList.id',
      :project-board-list-id='projectBoardList.id',
      :id='`column-${projectBoardList.id}`'
    )
</template>

<script>
import Draggable from 'vuedraggable'
import List from './board/list'

export default {
  components: {
    Draggable,
    List
  },
  computed: {
    projectBoardLists: {
      get () {
        return this.$store.getters['projects-board/projectBoardLists']
      },
      set (projectBoardLists) {
        this.$store.commit('projects-board/projectBoardLists', projectBoardLists)
      }
    }
  },
  methods: {
    change (event) {
      if (!event.moved) return
      this.$store.dispatch('projects-board/moveProjectBoardList', {
        projectBoardList: event.moved.element,
        ordinalNumber: event.moved.newIndex
      })
    }
  }
}
</script>

<style lang='sass' scoped>
  .projects-board-body
    overflow-x: auto
    overflow-y: auto
    flex-grow : 1
    white-space: nowrap
    margin-right: -15px
    margin-left: -15px
    height: 100%
    padding-left: 13px
</style>
