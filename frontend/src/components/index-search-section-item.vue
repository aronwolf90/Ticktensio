<template lang='pug'>
.item
  a(:href="link") {{ text }}
</template>

<script>
export default {
  props: [
    'link',
    'text'
  ]
}
</script>

<style lang='sass' scoped>
a
  color: black
</style>
