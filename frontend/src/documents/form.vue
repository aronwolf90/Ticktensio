<template lang='pug'>
  b-form(@submit="onSubmit")
    b-form-group(
      id="input-name-label",
      label="Name:",
      label-for="input-name"
    )
      b-form-input(
        id="input-name",
        v-model="form.name",
        :state="errorStatus('attributes/name')",
        type="text"
      )
      b-form-invalid-feedback(
        v-for="error in findErrors('attributes/name')"
      )
        | {{ error.detail }}
    input-file(
      endpoint="/api/v1/document_files",
      :errors="findErrors('data/attributes/document-file-id')",
      @input="setDocumentFile"
    )
    b-form-group(
      id="folder-label",
      label="Folder:",
      label-for="folder"
    )
      b-form-select(
        v-model='form.folder',
        id='folder',
        :state="errorStatus('data/relationships/folder')",
        :options='folders'
      )
      b-form-invalid-feedback(
        v-for="error in findErrors('data/relationships/folder')"
      )
        | {{ error.detail }}

    slot
    br
    br
</template>

<script>
import InputFile from '../components/inputs/file'

export default {
  components: {
    InputFile
  },
  props: [
    'name',
    'folder-type',
    'folder-id',
    'errors'
  ],
  data () {
    return {
      form: {
        name: null,
        folder: null
      },
      documentFile: null,
      folderRefs: []
    }
  },
  mounted () {
    this.form.name = this.name
    this.form.folder = {
      type: this.folderType,
      id: this.folderId
    }
  },
  created () {
    this.$store.dispatch('getArchiveFolders').then(response => {
      this.folderRefs = response.data
    })
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()

      let payload = {
        attributes: {
          name: this.form.name
        },
        relationships: {
          folder: {
            data: {
              id: this.form.folder.id,
              type: this.form.folder.type
            }
          }
        }
      }
      if (this.documentFile) {
        payload.attributes['document-file-id'] = this.documentFile.id
      }
      this.$emit('onSubmit', payload)
    },
    errorStatus (pointer) {
      let errors = this.findErrors(pointer)
      return errors.length === 0 ? null : false
    },
    findErrors (pointer) {
      return this.errors.filter(error => {
        return error.source.pointer.includes(pointer)
      })
        .filter((error, index, self) => {
          return self.findIndex(value => value.detail === error.detail) === index
        })
    },
    setDocumentFile (documentFile) {
      this.documentFile = documentFile
    }
  },
  computed: {
    folders () {
      return this.folderRefs.map(folderRef => {
        const folder = this.$store.getters.entry(folderRef)
        return {
          value: { id: folder.id, type: folder.type },
          text: folder.attributes.name
        }
      })
    }
  }
}
</script>

<style lang='sass'>
.b-form-file.is-invalid+.invalid-feedback
  display: block
</style>
