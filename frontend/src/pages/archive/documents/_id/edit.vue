<template lang='pug'>
  .documents-edit
    document-form(
      @onSubmit="onSubmit",
      v-if="document",
      :name="name",
      :folder-type="folderType",
      :folder-id="folderId",
      :errors="errors"
    )
      b-button(type="submit", variant="success") Update document
      b-button-group.pull-right
        form-btn-destroy(
          @destroy="destroy",
          :entry-ref="document"
        )
        b-button(to='/administration/archive') Cancel
</template>

<script>
import DocumentForm from 'documents/form'
import FormBtnDestroy from 'components/form-btn-destroy'
import store from 'store'
import { Utils } from 'vuex-jsonapi-client'

export default {
  components: {
    DocumentForm,
    FormBtnDestroy
  },
  props: [
    'documentId'
  ],
  data () {
    return {
      documentRef: null,
      errors: []
    }
  },
  async beforeRouteEnter (to, from, next) {
    const documentResponse = await store.dispatch('getDocument', to.params.documentId)
    next(vm => (vm.documentRef = documentResponse.data))
  },
  methods: {
    onSubmit (payload) {
      this.$store.dispatch('updateDocument', {
        entry: this.document,
        payload
      }).then(() => {
        this.$router.push('/administration/archive')
      })
        .catch(({ status, data }) => {
          this.errors = data.errors
        })
    },
    destroy () {
      return this.$store.dispatch('destroy', this.document).then(result => {
        this.$router.push('/administration/archive')
      })
    }
  },
  computed: {
    document () {
      return this.$store.getters.entry(this.documentRef)
    },
    name () {
      return Utils.attribute(this.document, 'name')
    },
    folderType () {
      if (!this.document) return
      return this.document.relationships.folder.data.type
    },
    folderId () {
      if (!this.document) return
      return this.document.relationships.folder.data.id
    }
  }
}
</script>
