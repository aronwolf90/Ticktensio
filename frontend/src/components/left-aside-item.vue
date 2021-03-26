<template lang='pug'>
  li(v-bind:class="{ active: isActive }")
    router-link(:to="path")
      slot
</template>

<script>

export default {
  props: ['path', 'notShowActive'],
  computed: {
    isActive () {
      return !this.notShowActive && this.$route.path === this.path
    }
  }
}
</script>
