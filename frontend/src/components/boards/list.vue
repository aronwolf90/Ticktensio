<template lang='pug'>
  .card.column
    .card-header
      slot(name="header")
    draggable.body(
      :value="value",
      @input="input",
      @change="change",
      :options="{group: 'items', delay: 200, touchStartThreshold: 5, delayOnTouchOnly: true }"
    )
      slot(name="items")
      .more(v-if='showMore')
        .text(v-on:click.self="$emit('loadMore')") Load more
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: ['value', 'showMore'],
  methods: {
    input (value) {
      this.$emit('input', value)
    },
    change (event) {
      this.$emit('change', event)
    }
  }
}
</script>

<style lang='sass' scoped>
.column
  display: inline-block
  vertical-align: text-top
  margin-right: 13px
  width: 300px
  .body
    background-color: #fbfbfb
    min-height: 20px
    .more
      text-align: center
      .text
        display: inline-block
        &:hover
          text-decoration: underline
          cursor: pointer
</style>
