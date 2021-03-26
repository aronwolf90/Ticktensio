<template lang='pug'>
  btn-destroy(
    variant="outline-danger",
    size="sm",
    :entry-id="entryId"
    :entry-type="entryType"
    @destroy="$emit('destroy')"
  )
    i.fa.fa-trash
</template>

<script>
import BtnDestroy from 'components/btn-destroy'

export default {
  components: {
    BtnDestroy
  },
  props: {
    entryRef: {
      type: Object,
      required: true
    }
  },
  computed: {
    entryId () {
      return (this.entryRef || {}).id
    },
    entryType () {
      return (this.entryRef || {}).type
    }
  }
}
</script>
