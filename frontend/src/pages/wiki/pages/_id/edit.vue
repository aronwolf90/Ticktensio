<template lang='pug'>
  b-form(@submit="submit", v-if='loaded')
    .row
      .col-12
        b-form-input(
          type="text",
          v-model="form.attributes.title",
          required,
          placeholder="Title"
        )
        br
    .row
      .col-12
        markdown-editor(
          v-model='form.attributes.content'
        )
        br
    .row
      .col-6
        button.btn.btn-sm.btn-success(type='submit')
          .fa.fa-spinner.fa-spin(v-if='isSaving')
          | Save
      .col-6
        .btn-group.float-right
          router-link.btn.btn-sm.btn-secondary(to='/') Cancel
          .btn.btn-sm.btn-danger(v-on:click='deleteWikiPage($event)') Delete
</template>

<script>
import MarkdownEditor from 'markdown_editor'

export default {
  props: ['wikiPageId'],
  data () {
    return {
      loaded: false,
      form: null,
      isSaving: false
    }
  },
  components: {
    'markdown-editor': MarkdownEditor
  },
  mounted () {
    this.$store.dispatch('initWikiPage', this.wikiPageId).then(() => {
      this.form = JSON.parse(JSON.stringify(this.$store.getters.entry({
        type: 'wiki-pages',
        id: this.wikiPageId
      })))
      this.loaded = true
    })
  },
  computed: {
    wikiPage () {
      return this.$store.getters.entry({ type: 'wiki-pages', id: this.wikiPageId })
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()

      this.isSaving = true

      this.$store.dispatch('updateWikiPage', {
        entry: this.wikiPage,
        attributes: this.form.attributes
      }).then(() => {
        this.isSaving = false
        this.$router.replace('.')
      })
    },
    setContent (data) {
      this.form.attributes.content = data
    },
    deleteWikiPage (event) {
      this.$store.dispatch('destroy', {
        entry: this.wikiPage
      }).then(() => {
        this.$router.push('/administration/wiki')
      })
    }
  }
}
</script>
