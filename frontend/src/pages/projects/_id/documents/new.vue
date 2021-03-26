<template lang='pug'>
  .documents-new
    document-form(
      @submit='submit',
      :errors="errors",
      v-model="form",
      :select-folder="false",
    )
      b-button(type="submit", variant="success") Create document
      b-button.pull-right(variant="secondary", :to="cancelPath") Cancel
</template>

<script>
import DocumentForm from 'components/documents/form'
import { Utils } from 'vuex-jsonapi-client'

export default {
  props: ['projectId'],
  components: {
    DocumentForm
  },
  created () {
    this.fetch()
  },
  data () {
    return {
      form: {
        attributes: {
          name: null
        },
        relationships: {
          folder: {
            data: null
          }
        }
      },
      errors: []
    }
  },
  computed: {
    cancelPath () {
      return `/administration/projects/${this.projectId}/documents`
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('createDocument', this.form)
        .then(() => {
          this.$router.push(`/administration/projects/${this.projectId}/documents`)
        })
        .catch(({ status, data }) => {
          this.errors = data.errors
        })
    },
    fetch () {
      this.$store.dispatch('getProjectFolder', this.projectId).then(data => {
        this.form.relationships.folder.data = Utils.entryToRef(data)
      })
    }
  }
}
</script>
