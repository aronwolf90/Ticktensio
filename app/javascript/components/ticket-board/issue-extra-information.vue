<template lang='pug'>
  .issue-extra-information(v-if="issue")
    template(v-for="label in labels")
      b-badge(
        v-bind:style="{ 'background-color': label.attributes.color }"
      ) {{ label.attributes.name }}
      |&nbsp;
    template(v-if="showProject")
      b-badge {{ complexity }}
      |&nbsp;
    b-badge(v-if="showProject") {{ projectName }}
    b-img.pull-right.border(
      :src="avatarUrl",
      rounded="circle",
      :alt="userName",
      width="30",
      height="30",
      v-if="user",
      v-b-popover.hover.right="userName"
    )
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['issueRef'],
  computed: {
    issue () {
      return this.$store.getters.entry(this.issueRef)
    },
    labels () {
      return this.$store.getters.relationship(this.issue, 'labels') || []
    },
    avatarUrl () {
      return Utils.attribute(this.user, 'avatar-url')
    },
    userName () {
      const firstname = Utils.attribute(this.user, 'firstname')
      const lastname = Utils.attribute(this.user, 'lastname')
      return `${firstname} ${lastname}`
    },
    user () {
      return this.$store.getters.relationship(this.issue, 'user')
    },
    showComplexity () {
      return Utils.attribute(this.issue, 'complexity') &&
        Utils.attribute(this.issue, 'complexity') !== '0.0'
    },
    complexity () {
      return Utils.attribute(this.issue, 'complexity')
    },
    project () {
      return this.$store.getters.relationship(this.issue, 'project')
    },
    projectName () {
      return Utils.attribute(this.project, 'name')
    },
    showProject () {
      return !this.$store.getters['board/project']
    }
  }
}

</script>

<style lang='sass' scoped>
 img
   object-fit: cover
</style>
