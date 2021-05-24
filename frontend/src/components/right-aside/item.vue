<template lang='pug'>
.right-aside-item
  .header
    slot(name="header")
      label.font-weight-bold(:for="labelFor") {{ label }}
  .content
    slot(name="content") {{ text  }}
  hr.divider
</template>

<script>
export default {
  props: {
    label: String,
    text: String,
    labelFor: String
  }
}
</script>

<style lang='sass' scoped>
.right-aside-item
  margin-left: $right-aside-margin
  .header
    color: grey
    label
      margin-top: $right-aside-margin
      margin-bottom: 0
  .content
    color: grey
  .divider
    margin-top: $right-aside-margin / 2 
    margin-left: -$right-aside-margin
    margin-bottom: 0
</style>
