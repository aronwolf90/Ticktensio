<template lang='pug'>
#right-aside
  .placeholder
  .right-aside(v-bind:class="{ expanded: expanded }")
    .right-aside-container
      slot
    .arrow(@click="toggleExpanded")
      .fa.fa-angle-right.fa-2x(v-if="expanded")
      .fa.fa-angle-left.fa-2x(v-else="expanded")
</template>

<script>

export default {
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    toggleExpanded () {
      this.expanded = !this.expanded
    }
  }
}

</script>

<style lang='sass' scoped>
#right-aside
  .placeholder
    width: 0px
    @media only screen and (max-width: 600px)
      width: 30px
  .right-aside
    background-color: #f8f8f8
    border-left: 2px solid #e7e7e7
    width: 210px
    height: 100%
    .right-aside-container
      overflow-y: auto
      overflow-x: hidden
      height: 100%
    .arrow
      position: fixed
      bottom: 25px
      right: 9px
    @media only screen and (max-width: 600px)
      right: 0
      position: fixed
      z-index: 999
      &:not(.expanded)
        width: 30px
        .right-aside-container
          display: none
    @media only screen and (min-width: 600px)
      .arrow
        display: none
</style>
