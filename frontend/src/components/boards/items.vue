<template lang='pug'>
  .card.item
    .card-body.item-body
      .row
        .col-10.text
          slot(name="text")
        .col-2
          slot(name="main-action")
      .row
        .col-12
          slot(name="extra-information")
</template>

<script>

export default {
}

</script>

<style lang='sass' scoped>
.item
  margin: 5px
  box-shadow: 0 1px 2px rgba(186,186,186,0.5)
  .item-body
    padding: 0.5rem
    .text
      overflow: hidden
      text-overflow: ellipsis
      a
        color: black
</style>
