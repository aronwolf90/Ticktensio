<template lang='pug'>
  .project-search
    b-form-input(
      type='text',
      v-model='searchText',
      placeholder='Search',
      @focus.native="focused = true"
    )
    .items(v-if="focused")
      project-search-select-item(
        v-for="project in projects",
        :project-id="project.id",
        :key="project.id"
      )
</template>

<script>
import ProjectSearchSelectItem from './project_search_select_item'

export default {
  data () {
    return {
      searchText: '',
      focused: false,
      requestProjects: null
    }
  },
  components: {
    ProjectSearchSelectItem
  },
  created () {
    this.$store.dispatch('initProjects')
  },
  mounted () {
    window.onclick = () => {
      this.focused = false
    }
    this.$el.onclick = (event) => {
      event.stopPropagation()
    }
  },
  computed: {
    projects () {
      return this.relevantProjects || []
    },
    relevantProjects () {
      return this.requestProjects || this.$store.getters.metaCollection('projects')
    }
  },
  methods: {
    request () {
      this.$store.dispatch('request', {
        url: `/api/v1/projects?query=${this.searchText}`
      }).then(response => {
        this.requestProjects = response.data
      })
    }
  },
  watch: {
    searchText () {
      this.request()
    }
  }
}
</script>

<style lang='sass' scoped>
.project-search
  position: relative
  .items
    position: absolute
    z-index: 1000
    background: white
    width: 460px
    border: 1px solid lightgrey
    margin-left: 1px
    max-height: 400px
    overflow-y: auto
    box-shadow: 0 1px 7px 0 rgba(0, 0, 0, .3)
    padding: 4px
</style>
