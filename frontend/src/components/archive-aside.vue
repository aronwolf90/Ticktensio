<template lang='pug'>
  span
    left-aside-item(path="/administration/archive")
      i.fa.fa-folder-open.fa-lg
      | &nbsp; &nbsp; Archive
</template>

<script>
import draggable from 'vuedraggable'
import LeftAsideItem from 'components/left-aside-item'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    LeftAsideItem,
    draggable
  },
  data () {
    return {
      projectStatusesRefs: []
    }
  },
  created () {
    this.fetch()
  },
  watch: {
    '$route' (to, from) {
      this.fetch()
    }
  },
  computed: {
    projectStatuses: {
      get () {
        return this.projectStatusesRefs.map(ref => {
          return this.$store.getters.projectStatus(ref.id)
        })
      },
      set (projectStatuses) {
        this.projectStatusesRefs = Utils.entryArrayToRef(projectStatuses)
      }
    }
  },
  methods: {
    fetch () {
      this.$store.dispatch('getProjectStatuses').then(response => {
        this.projectStatusesRefs = Utils.entryArrayToRef(response.data)
      })
    },
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
