<template lang='pug'>
  board-item
    template(v-slot:text="")
      router-link(:to="showPath")
        | {{ name }}
    template(v-slot:main-action="")
      router-link.text-secondary(:to='editPath')
        .fa.fa-edit
    template(v-slot:extra-information="")
      b-badge(v-if="mainResponsable") {{ mainResponsableName }}
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import BoardItem from 'components/boards/items'

export default {
  components: {
    BoardItem
  },
  props: {
    'project-id': { required: true }
  },
  computed: {
    project () {
      return this.$store.getters.project(this.projectId)
    },
    showPath () {
      return `/administration/projects/${this.projectId}`
    },
    editPath () {
      return `/administration/projects/${this.projectId}/edit`
    },
    name () {
      return Utils.attribute(this.project, 'name')
    },
    mainResponsableName () {
      return Utils.attribute(this.mainResponsable, 'firstname') + ' ' +
        Utils.attribute(this.mainResponsable, 'lastname')
    },
    mainResponsable () {
      return this.$store.getters.relationship({
        entry: this.project,
        name: 'main-responsable'
      })
    }
  }
}

</script>

<style lang='sass' scoped>
  .project
    margin: 5px
    box-shadow: 0 1px 2px rgba(186,186,186,0.5)
    .project-body
      padding: 0.5rem
      .text
        overflow: hidden
        text-overflow: ellipsis
        a
          color: black
</style>
