<template lang='pug'>
  .show-container
    slot
</template>

<script>
export default {
}
</script>

<style lang='sass' scoped>
  .show-container
    display: flex
    margin-right: -14px
    margin-top: -17px
    height: calc(100% + 16px)
</style>
