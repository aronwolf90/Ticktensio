<template lang='pug'>
  b-button(
    variant="outline-dark",
    size="sm",
    v-if="canEdit",
    :to="link"
  )
    i.fa.fa-edit
</template>

<script>

export default {
  props: [
    'basePath',
    'entryId',
    'entryType'
  ],
  computed: {
    link () {
      return `${this.basePath}/${this.entry.id}/edit`
    },
    entry () {
      return this.$store.getters.entry({
        type: this.entryType,
        id: this.entryId
      })
    },
    canEdit () {
      return this.entry &&
             this.entry.meta &&
             this.entry.meta.permissions &&
             this.entry.meta.permissions.update
    }
  }
}
</script>
