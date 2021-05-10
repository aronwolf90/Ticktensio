<template lang='pug'>
b-navbar.fixed-top(toggleable="sm" type="dark")
  button#side-toggle-btn(@click='handleClickToogleBtn')
    i.fa.fa-2x.fa-angle-right
  router-link(to="/administration")
    img(:src="require('images/logo.png')", width="80")

  b-navbar-toggle(target="navbarSupportedContent")

  b-collapse#navbarSupportedContent(is-nav="")
    ul.navbar-nav.mr-auto.ml-4
      li.nav-item
        menu-item(
          name="Projects",
          path='/administration/projects',
          starts-with="/administration/projects"
        )
      li.nav-item
        menu-item(
          name="Wiki",
          path="/administration/wiki",
          starts-with="/administration/wiki"
        )
      li.nav-item
        menu-item(
          name="Archive",
          path="/administration/archive",
          starts-with="/administration/archive"
        )
      li.nav-item
        menu-item(
          name="Users",
          path="/administration/users",
          starts-with="/administration/users"
        )
      li.nav-item
        menu-item(
          name="Contacts",
          path="/administration/contacts",
          starts-with="/administration/contacts"
        )
      li.nav-item
        menu-item(
          name="Admin",
          path="/administration/admin/context",
          starts-with="/administration/admin"
        )

    ul.navbar-nav
      notification-bell
      li.nav-item
        b-nav-item-dropdown.right-menu(right="")
          template(v-slot:button-content="")
            img.rounded-circle(width="24", height="24", :src="currentUserImgUrl")
          b-dropdown-item {{ currentUserName }}
          b-dropdown-item(:to="`/administration/users/${currentUserId}`") Settings
          .dropdown-divider
          form(method="post", action="/users/sign_out")
            li
              input(type="hidden", name="authenticity_token", :value="csfrToken")
              input(type="hidden", name="_method", value="delete")
              input.dropdown-item(type="submit", value="Sign out")
</template>

<script>
import MenuItem from 'components/menu-item'
import NotificationBell from 'components/notification_bell'
import Cookies from 'js-cookie'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    MenuItem,
    NotificationBell
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    },
    currentUserImgUrl () {
      return Utils.attribute(this.currentUser, 'avatar-url')
    },
    currentUserId () {
      if (!this.currentUser) return
      return this.currentUser.id
    },
    currentUserName () {
      return `${Utils.attribute(this.currentUser, 'firstname')} ${Utils.attribute(this.currentUser, 'lastname')}`
    },
    csfrToken () {
      return Cookies.get('csrf_token')
    }
  },
  methods: {
    handleClickToogleBtn () {
      toggleAsideExpanded()
    }
  }
}
</script>

<style lang='sass'>
.right-menu
  .dropdown-toggle
    padding: 0
</style>
