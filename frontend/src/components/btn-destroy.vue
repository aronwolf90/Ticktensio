<template lang='pug'>
  b-button(
    :variant="variant",
    :size="size",
    v-if="canDestroy",
    @click="showConfirmDialog"
  )
    slot
</template>

<script>

export default {
  props: [
    'entryId',
    'entryType',
    'variant',
    'size'
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
    canDestroy () {
      return this.entry &&
             this.entry.meta &&
             this.entry.meta.permissions &&
             this.entry.meta.permissions.destroy
    }
  },
  methods: {
    async showConfirmDialog () {
      const confirmResult = await this.$bvModal.msgBoxConfirm('Do you really want to delete it?', {
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
      if (confirmResult) this.$emit('destroy')
    }
  }
}
</script>
