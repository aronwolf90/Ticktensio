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
          ul.nav.navbar-nav.shared-section
            shared-issue-section
      section#side-body.container-fluid
        .body-content
          router-view
</template>

<script>
import Navbar from 'components/navbar'
import Asides from 'components/asides'
import SharedIssueSection from 'components/shared-issue-section'
import 'stylesheets/administration.sass'
import 'font-awesome/css/font-awesome.min.css'

export default {
  components: {
    Navbar,
    Asides,
    SharedIssueSection
  }
}

</script>
