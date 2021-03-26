<template lang='pug'>
  .documents-edit
    document-form(
      @submit="submit",
      v-if="show",
      v-model="form",
      :errors="errors"
    )
      b-button(type="submit", variant="success") Update document
      b-button-group.pull-right
        b-button.pull-right(variant="danger", @click="destroy") Destroy
        b-button.pull-right(variant="secondary", :to="cancelPath") Cancel
</template>

<script>
import DocumentForm from 'components/documents/form'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    DocumentForm
  },
  props: ['projectId', 'id'],
  data () {
    return {
      show: false,
      form: {
        attributes: {
          name: null
        }
      },
      errors: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    submit () {
      this.$store.dispatch('updateDocument', {
        entry: this.document,
        payload: this.form
      }).then(() => {
        this.$router.push(`/administration/projects/${this.projectId}/documents`)
      })
        .catch(({ status, data }) => {
          this.errors = data.errors
        })
    },
    fetch () {
      return this.$store.dispatch('getDocument', this.id).then(result => {
        this.form.attributes.name = Utils.attribute(result.data, 'name')
        this.show = true
      })
    },
    destroy () {
      return this.$store.dispatch('destroy', this.document).then(result => {
        this.$router.push('..')
      })
    }
  },
  computed: {
    document () {
      return this.$store.getters.document(this.id)
    },
    cancelPath () {
      return `/administration/projects/${this.projectId}/documents`
    }
  }
}
</script>
