<template lang='pug'>
  .container-fluid.show-body
    slot
</template>

<script>
export default {
}
</script>

<style lang='sass' scoped>
.show-body
  padding-top: 15px
  overflow-y: auto
</style>
