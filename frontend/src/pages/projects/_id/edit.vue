<template lang='pug'>
  b-form(@submit.prevent="submit", v-if="formLoaded")
    b-form-input(
      type="text",
      required,
      v-model="name",
      placeholder="Title",
      id="name-input"
    )
    br
    markdown-editor(
      v-model="description"
    )
    br
    button.btn.btn-sm.btn-success(type='submit')
      .fa.fa-spinner.fa-spin(v-if='isSaving')
      | Save
    .btn-group.float-right
      router-link.btn.btn-sm.btn-secondary(to='.') Cancel
      form-btn-destroy(
        :entry-ref="project",
        @destroy="destroy"
      ) Destroy
</template>

<script>
import FormBtnDestroy from 'components/form-btn-destroy'
import store from 'store'
import projectsShow from 'store/modules/projects-show'
import MarkdownEditor from 'markdown_editor'

if (!store.hasModule('projectsShow')) {
  store.registerModule('projectsShow', projectsShow)
}

export default {
  params: ['id'],
  components: {
    FormBtnDestroy,
    MarkdownEditor
  },
  computed: {
    formLoaded () {
      return this.$store.getters['projectsShow/formLoaded']
    },
    name: {
      get () {
        return this.$store.getters['projectsShow/formName']
      },
      set (value) {
        this.$store.commit('projectsShow/formName', value)
      }
    },
    description: {
      get () {
        return this.$store.getters['projectsShow/formDescription']
      },
      set (value) {
        this.$store.commit('projectsShow/formDescription', value)
      }
    },
    project () {
      return this.$store.getters['projectsShow/project']
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('projectsShow/updateProject').then(() => {
        this.$router.push('.')
      })
    },
    async destroy () {
      await this.$store.dispatch('destroy', this.project)
      this.$router.push('..')
    }
  }
}
</script>
