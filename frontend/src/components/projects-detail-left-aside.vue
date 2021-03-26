<template lang='pug'>
  span.projects-left-aside
    left-aside-item(:path="`/administration/projects/${id}`", notShowActive="true")
      i.fa.fa-tasks.fa-lg
      | &nbsp; &nbsp;{{ name }}
    left-aside-item(:path="`/administration/projects/${id}`")
      | Dashboard
    left-aside-item(:path="`/administration/projects/${id}/records`")
      | Records
    left-aside-item(:path="`/administration/projects/${id}/documents`")
      | Documents
    left-aside-item(:path="`/administration/projects/${id}/board_lists`")
      | Tickets
</template>

<script>
import LeftAsideItem from 'components/left-aside-item'
import LeftAsideItemRails from 'components/left-aside-item-rails'
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['id'],
  components: {
    LeftAsideItem,
    LeftAsideItemRails
  },
  computed: {
    name () {
      return Utils.attribute(
        this.$store.getters.project(this.id),
        'name'
      )
    }
  },
  watch: {
    id (value) {
      if (!value) return
      this.$store.dispatch('getProject', this.id)
    }
  }
}
</script>
