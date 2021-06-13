<template lang='pug'>
  li.left-aside-item(v-bind:class="{ active: isActive }")
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

<style lang='sass'>
li.left-aside-item
  display: block
  width: 100%
  border-bottom: 1px solid #e7e7e7
  &:hover
    background-color: #e7e7e7
  a
    padding: 15px
    display: block
    color: grey
    &:hover
      text-decoration: none
  &.active a
    background-color: transparent
    margin-right: -1px
    border-left: 5px solid $main-color

</style>
