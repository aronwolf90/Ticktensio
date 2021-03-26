<template lang='pug'>
  span(v-bind:class="{ expanded: expanded }")
    slot
</template>

<script>

export default {
  props: ['path', 'notShowActive'],
  computed: {
    expanded () {
      return window.leftAsideExpanded
    }
  }
}
</script>
