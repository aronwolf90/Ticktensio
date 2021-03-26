<template lang='pug'>
  .span
    left-aside(v-if="aside == 'global'")
    projects-left-aside(v-if="aside == 'projects'")
    projects-detail-left-aside(v-if="aside == 'projects-detail'", :id="projectsDetailId")
    wiki-aside(v-if="aside == 'wiki'")
    archive-aside(v-if="aside == 'archive'")
    users-aside(v-if="aside == 'users'")
    contacts-aside(v-if="aside == 'contacts'")
    admin-aside(v-if="aside == 'admin'")
    user-detail-aside(v-if="aside == 'user-detail'", :id="userDetailId")
</template>

<script>
import LeftAside from 'components/left-aside'
import ProjectsLeftAside from 'components/projects-left-aside'
import ProjectsDetailLeftAside from 'components/projects-detail-left-aside'
import WikiAside from 'components/wiki-aside'
import ArchiveAside from 'components/archive-aside'
import UsersAside from 'components/users-aside'
import ContactsAside from 'components/contacts-aside'
import AdminAside from 'components/admin-aside'
import UserDetailAside from 'components/user-detail-aside'

export default {
  components: {
    LeftAside,
    ProjectsLeftAside,
    ProjectsDetailLeftAside,
    WikiAside,
    ArchiveAside,
    UsersAside,
    ContactsAside,
    AdminAside,
    UserDetailAside
  },
  computed: {
    aside () {
      return this.$store.getters.aside
    },
    projectsDetailId () {
      return this.$route.params.projectId || this.$route.params.id
    },
    userDetailId () {
      return this.$route.params.userId || this.$route.params.id
    }
  }
}
</script>
