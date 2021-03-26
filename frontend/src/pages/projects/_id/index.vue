<template lang='pug'>
  div
    b-button-toolbar.pull-right
      b-button.mr-1(
        variant="outline-secondary",
        :to="`/administration/projects/${id}/edit`",
        size="sm"
      )
        .fa.fa-edit
      show-btn-destroy(
        :entry-ref="project",
        @destroy="destroy"
      )
    h4 {{ name }}
    markdown-viewer(:value='description')
</template>

<script>
import MarkdownViewer from 'markdown_viewer'
import { Utils } from 'vuex-jsonapi-client'
import ShowBtnDestroy from 'components/show-btn-destroy'
import store from 'store'
import projectsShow from 'store/modules/projects-show'

if (!store.hasModule('projectsShow')) {
  store.registerModule('projectsShow', projectsShow)
}

export default {
  props: ['id'],
  components: {
    MarkdownViewer,
    ShowBtnDestroy
  },
  computed: {
    project () {
      return this.$store.getters['projectsShow/project']
    },
    name () {
      return Utils.attribute(this.project, 'name')
    },
    description () {
      return Utils.attribute(this.project, 'description')
    }
  },
  methods: {
    async destroy () {
      await this.$store.dispatch('destroy', this.project)
      this.$router.push('/administration/projects')
    }
  }
}
</script>
