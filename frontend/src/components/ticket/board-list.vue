<template lang='pug'>
  #right-aside-board-list(v-if="boardList")
    right-aside-select(
      label="Board list",
      :options='options',
      :item='item',
      @select="onSelect"
    )
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import RightAsideSelect from 'components/right-aside/select'

export default {
  props: {
    issueRef: Object
  },
  components: {
    RightAsideSelect
  },
  computed: {
    issue () {
      return this.$store.getters.entry(this.issueRef)
    },
    boardList () {
      return this.$store.getters.relationship(this.issue, 'board-list')
    },
    options () {
      return this.$store.getters['issuesShow/boardLists'].map(boardList => {
        return {
          value: Utils.entryToRef(boardList),
          text: Utils.attribute(boardList, 'name')
        }
      })
    },
    item: {
      get () {
        if (!this.boardList) return
        return {
          value: Utils.entryToRef(this.boardList),
          text: Utils.attribute(this.boardList, 'name')
        }
      }
    }
  },
  methods: {
    onSelect (item) {
      this.$store.dispatch('issuesShow/updateBoardList',
        this.$store.getters.entry(item.value))
    }
  }
}
</script>

<style lang='sass' scoped>
.created-by
  margin-left: 18px
.divider
  margin-left: -18px
  margin-top: 0
  margin-bottom: 0
label
  margin-top: 8px
  margin-bottom: 0
  color: grey
.information
  margin-top: 4px
  color: grey
</style>
