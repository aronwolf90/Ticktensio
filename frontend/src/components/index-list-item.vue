<template lang='pug'>
  li.list-group-item(v-if="entry")
    router-link.text-dark(:to="`/administration/${resource}/${entryId}`")
      | {{ text || '---' }}
    router-link.btn.btn-secondary.btn-sm.pull-right(
      v-if="editBtn",
      :to="`/administration/${resource}/${entryId}/edit`"
    )
      .fa.fa-edit
</template>

<script>
import BtnEdit from './btn-edit'

export default {
  props: [
    'entry-type',
    'entry-id',
    'text',
    'resource',
    'editBtn'
  ],
  components: {
    BtnEdit
  },
  computed: {
    entry () {
      return this.$store.getters.entry({
        id: this.entryId,
        type: this.entryType
      })
    }
  }
}
</script>
