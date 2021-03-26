<template lang='pug'>
  b-form(@submit.prevent="$emit('submit')")
    form-inputs-text(
      id="name-input",
      v-model="formName",
      label="Name",
      error-path="attributes/name",
      :errors="errors"
    )
    form-inputs-folder-select(
      id="folder-input",
      v-model="formFolderRef",
      label="Folder",
      errorPath="relationships/folder",
      :errors="errors"
    )
    slot
</template>

<script>
import FormInputsText from 'components/form-inputs/text'
import FormInputsFolderSelect from 'components/form-inputs/folder-select'

export default {
  components: {
    FormInputsText,
    FormInputsFolderSelect
  },
  computed: {
    formName: {
      get () {
        return this.$store.getters['foldersForm/formName']
      },
      set (name) {
        this.$store.commit('foldersForm/formName', name)
      }
    },
    formFolderRef: {
      get () {
        return this.$store.getters['foldersForm/formFolderRef']
      },
      set (folderRef) {
        this.$store.commit('foldersForm/formFolderRef', folderRef)
      }
    },
    errors () {
      return this.$store.getters['foldersForm/errors']
    }
  }
}
</script>
