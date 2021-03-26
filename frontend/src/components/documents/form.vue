<template lang='pug'>
  b-form(@submit.prevent="$emit('submit')")
    b-form-group(
      id="input-name-label",
      label="Name:",
      label-for="input-name"
    )
      b-form-input(
        id="input-name",
        v-model="value.attributes.name",
        :state="errorStatus('attributes/name')",
        type="text"
      )
      b-form-invalid-feedback(
        v-for="(error, index) in findErrors('attributes/name')",
        :key="index"
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
      label-for="folder",
      v-if="selectFolder"
    )
      b-form-select(
        v-model='value.relationships.folder.data',
        id='folder',
        :state="errorStatus('data/relationships/folder')",
        :options='folders'
      )
      b-form-invalid-feedback(
        v-for="(error, index) in findErrors('data/relationships/folder')",
        :key="index"
      )
        | {{ error.detail }}

    slot
    br
    br
</template>

<script>
import InputFile from 'components/inputs/file'

export default {
  components: {
    InputFile
  },
  props: ['value', 'errors', 'select-folder'],
  methods: {
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
      this.value.attributes['document-file-id'] = documentFile.id
    }
  },
  computed: {
    folders () {
      if (!this.result) return []
      return this.result.data.map(folder => ({
        value: { id: folder.id, type: folder.type },
        text: folder.attributes.name
      }))
    }
  },
  asyncComputed: {
    result () {
      return this.$store.dispatch('initFolders')
    }
  },
  watch: {
    value () {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang='sass'>
.b-form-file.is-invalid+.invalid-feedback
  display: block
</style>
