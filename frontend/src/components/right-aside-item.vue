<template lang='pug'>
  .right-aside-item
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
  margin-left: 18px
.divider
  margin-left: -18px
  margin-top: 0
  margin-bottom: 0
label
  margin-top: 8px
  margin-bottom: 0
  color: grey
.content
  margin-top: 4px
  color: grey
  padding-bottom: 10px
</style>
