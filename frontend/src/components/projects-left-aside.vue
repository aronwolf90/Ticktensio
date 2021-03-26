<template lang='pug'>
  span.projects-left-aside
    left-aside-item(path="/administration/projects", notShowActive="true")
      i.fa.fa-tasks.fa-lg
        | &nbsp; &nbsp; Projects
    left-aside-item(path="/administration/projects")
      | All
    draggable(v-model="projectStatuses", @change="changed")
      left-aside-item.project-status(
        :path="`/administration/project_statuses/${projectStatus.id}`",
        v-for="projectStatus in projectStatuses",
        :key="projectStatus.id",
        :id="`project-status-${projectStatus.id}`"
      )
        | {{ projectStatus.attributes.name }}
    left-aside-item.text-center(path="/administration/project_statuses/new")
      i.fa.fa-plus(aria-hidden="true")
</template>

<script>
import draggable from 'vuedraggable'
import LeftAsideItem from 'components/left-aside-item'

export default {
  components: {
    LeftAsideItem,
    draggable
  },
  created () {
    this.$store.dispatch('projectsLeftAside/fetch')
  },
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('projectsLeftAside/fetch')
    }
  },
  computed: {
    projectStatuses: {
      get () {
        return this.$store.getters['projectsLeftAside/projectStatuses']
      },
      set (projectStatuses) {
        this.$store.commit('projectsLeftAside/projectStatuses', projectStatuses)
      }
    }
  },
  methods: {
    changed (event) {
      if (!event.moved) return
      this.$store.dispatch('updateProjectStatus', {
        projectStatus: event.moved.element,
        payload: { attributes: { 'ordinal-number': event.moved.newIndex } }
      })
    }
  }
}
</script>
