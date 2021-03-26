<template lang='pug'>
  router-link.search-select-item(:to="link")
    .title.text-dark {{ title }}
    .extra-information
      slot
</template>

<script>

export default {
  props: ['title', 'link']
}
</script>

<style lang='sass' scoped>
.search-select-item
  display: block
  padding: 6px
  border-bottom: 1px solid lightgrey
a:hover
  text-decoration: none
  background-color: #eae8e8
</style>
