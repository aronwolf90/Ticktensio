<template lang='pug'>
  #main-responsable(v-if="project")
    detail-select(
      id='main-responsable',
      label="Main responsable",
      :options='options',
      :item='item',
      @select="onSelect"
    )
</template>

<script>
import DetailSelect from 'components/detail-select'

export default {
  components: {
    DetailSelect
  },
  created () {
    this.$store.dispatch('initUsers')
  },
  computed: {
    options () {
      return this.$store.getters.users.map(user => {
        return {
          value: { id: user.id, type: user.type },
          text: user.attributes.firstname
        }
      })
    },
    item: {
      get () {
        if (!this.mainResponsable) return
        return {
          value: {
            id: this.mainResponsable.id,
            type: this.mainResponsable.type
          },
          text: this.mainResponsable.attributes.firstname
        }
      }
    },
    project () {
      return this.$store.getters['projectsShow/project']
    },
    mainResponsable () {
      return this.$store.getters.associatedEntry({
        entry: this.project,
        name: 'main-responsable'
      })
    }
  },
  methods: {
    onSelect (item) {
      this.$store.dispatch('updateProject', {
        project: this.project,
        payload: {
          relationships: {
            'main-responsable': {
              data: item.value
            }
          }
        }
      })
    }
  }
}
</script>

<style lang='sass'>
</style>
