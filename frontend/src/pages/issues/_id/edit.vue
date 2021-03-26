<template lang='pug'>
  b-form(@submit="submit", v-if='form')
    .row
      .col-12
        b-form-input(
          type="text",
          v-model="form.attributes.title",
          required,
          placeholder="Title",
          id="name-input"
        )
        br
    .row
      .col-12
        markdown-editor#input-description(
          v-model='form.attributes.description',
        )
        br
    .row
      .col-6
        button.btn.btn-sm.btn-success(type='submit')
          .fa.fa-spinner.fa-spin(v-if='isSaving')
          | Save
      .col-6
        .btn-group.float-right
          router-link.btn.btn-sm.btn-secondary(to='.') Cancel
          .btn.btn-sm.btn-danger(v-on:click='deleteIssue($event)') Delete
</template>

<script>
import MarkdownEditor from 'markdown_editor'
import store from 'store'

export default {
  props: ['issueId'],
  data () { return { form: null, isSaving: false } },
  components: {
    'markdown-editor': MarkdownEditor
  },
  async beforeRouteEnter (to, from, next) {
    await store.dispatch('initIssue', to.params.id)
    next(vm => {
      vm.form = JSON.parse(JSON.stringify(vm.$store.getters.entry({ type: 'issues', id: vm.issueId })))
    })
  },
  computed: {
    issue () {
      return this.$store.getters.entry({ type: 'issues', id: this.issueId })
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()

      this.isSaving = true

      this.$store.dispatch('updateIssue', {
        entry: this.issue,
        attributes: this.form.attributes
      }).then(() => {
        this.isSaving = false
        this.$router.replace('.')
      })
    },
    setDescription (data) {
      this.form.attributes.description = data
    },
    deleteIssue (event) {
      this.$store.dispatch('destroy', {
        entry: this.issue
      }).then(() => {
        this.$router.push('/administration/board')
      })
    }
  }
}
</script>

<style lang='sass' scoped>
</style>
