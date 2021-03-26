<template lang='pug'>
  router-link.nav-link.small(:to="path", v-bind:class="{ active: isActive }")
    | {{ name }}
</template>

<script>

export default {
  props: ['path', 'name', 'startsWith'],
  computed: {
    isActive () {
      return this.$route.path.startsWith(this.path) ||
        this.$route.path.startsWith(this.startsWith)
    }
  }
}
</script>

<style lang='sass' scope>
  .acitve
    color: #fff
</style>
