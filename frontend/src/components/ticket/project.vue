<template lang='pug'>
  #right-aside-project(v-if="project")
    right-aside-select(
      label="Project",
      :options='options',
      :item='item',
      @select="onSelect",
      @search="search"
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
    project () {
      return this.$store.getters.relationship(this.issue, 'project')
    },
    options () {
      return this.$store.getters['issuesShow/projects'].map(boardList => {
        return {
          value: Utils.entryToRef(boardList),
          text: Utils.attribute(boardList, 'name')
        }
      })
    },
    item: {
      get () {
        if (!this.project) return
        return {
          value: Utils.entryToRef(this.project),
          text: Utils.attribute(this.project, 'name')
        }
      }
    }
  },
  methods: {
    onSelect (item) {
      this.$store.dispatch('issuesShow/updateProject',
        this.$store.getters.entry(item.value))
    },
    search (text) {
      this.$store.dispatch('issuesShow/getProjects', text)
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
