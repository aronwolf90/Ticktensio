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
export default {
  components: {
    LeftAside: () => import('components/left-aside'),
    ProjectsLeftAside: () => import('components/projects-left-aside'),
    ProjectsDetailLeftAside: () => import('components/projects-detail-left-aside'),
    WikiAside: () => import('components/wiki-aside'),
    ArchiveAside: () => import('components/archive-aside'),
    UsersAside: () => import('components/users-aside'),
    ContactsAside: () => import('components/contacts-aside'),
    AdminAside: () => import('components/admin-aside'),
    UserDetailAside: () => import('components/user-detail-aside')
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
