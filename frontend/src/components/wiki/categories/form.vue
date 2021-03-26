<template lang='pug'>
  b-form(@submit.prevent="$emit('submit')")
    form-inputs-text(
      id="title-input",
      v-model="formTitle",
      label="Title",
      error-path="attributes/title",
      :errors="errors"
    )
    form-inputs-wiki-category-select(
      id="wiki-category-input",
      v-model="formWikiCategoryRef",
      label="Category",
      errorPath="relationships/wiki-category",
      :errors="errors"
    )
    slot
</template>

<script>
import FormInputsText from 'components/form-inputs/text'
import FormInputsWikiCategorySelect from 'components/form-inputs/wiki-category-select'

export default {
  components: {
    FormInputsText,
    FormInputsWikiCategorySelect
  },
  computed: {
    formTitle: {
      get () {
        return this.$store.getters['wikiCategoriesForm/formTitle']
      },
      set (title) {
        this.$store.commit('wikiCategoriesForm/formTitle', title)
      }
    },
    formWikiCategoryRef: {
      get () {
        return this.$store.getters['wikiCategoriesForm/formWikiCategoryRef']
      },
      set (folderRef) {
        this.$store.commit('wikiCategoriesForm/formWikiCategoryRef', folderRef)
      }
    },
    errors () {
      return this.$store.getters['wikiCategoriesForm/errors']
    }
  }
}
</script>
