<template lang='pug'>
div
  template(v-if="$route.meta.layout == 'none'")
    router-view
  div(v-else="")
    navbar
    .wraper
      .side-menu
        .nav.navbar-nav
          asides
        shared-issue-section
      section#side-body.container-fluid
        .body-content
          router-view
</template>

<script>
import Navbar from 'components/navbar'
import Asides from 'components/asides'
import SharedIssueSection from 'components/shared-issue-section'
import 'font-awesome/css/font-awesome.min.css'

export default {
  components: {
    Navbar,
    Asides,
    SharedIssueSection
  }
}

</script>

<style lang='sass'>
.wraper
  display: flex
  align-items: stretch

.side-menu
  min-width: $side-menu-width
  max-width: $side-menu-width
  margin-top: $navbar-height
  height: calc(100vh - 54px)
  background-color: #f8f8f8
  border-right: 2px solid #e7e7e7
  z-index: 999
  display: flex
  flex-direction: column

  @media only screen and (max-width: 600px)
    display: none
    position: fixed
    left: 0
    margin-top: $navbar-height-mobile
    &.expanded
      display: flex
      min-width: $side-menu-width
      max-width: $side-menu-width

  .navbar
    border: none

  .navbar-header
    width: 100%
    border-bottom: 1px solid #e7e7e7

  .navbar-nav
    flex: 1
    overflow-y: auto
    overflow-x: hidden
    background: linear-gradient(white 30%, rgba(255, 255, 255, 0)), linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%, radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)), radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%;
    background-repeat: no-repeat
    background-attachment: local, local, scroll, scroll
    background-size: 100% 45px, 100% 45px, 100% 15px, 100% 15px

#side-body
  padding-top: 22px
  margin-top: 51px
  height: calc(100vh - 51px)
  max-height: calc(100vh - 51px)
  overflow-y: auto
  display: flex
  flex-flow: column
  @media only screen and (max-width: 600px)
    margin-left: 0
    max-width: 100%
  .body-content
    flex-grow : 1
    height: 100%
    min-height: 0
    position: relative
</style>
