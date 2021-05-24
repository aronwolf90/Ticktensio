<template lang='pug'>
  b-form.right-aside-select-header-input(
    @submit.prevent="submit",
    :id="id"
  )
    b-input-group(v-if="internEditMode")
      v-select.flex-fill(
        v-model="value",
        :id="`${id}-input`",
        :options="options"
        @search="search",
        :getOptionLabel="getOptionLabel",
        :filterable="false"
      )
      b-input-group-append
        b-button(
          variant="outline-secondary",
          size="sm",
          type="submit"
        )
          .fa.fa-spinner.fa-spin(v-if='isSaving')
          template(v-else='') ok
    span(v-else="")
      b-button.float-right(
        variant="light",
        size="sm",
        @click="internEditMode=true"
      )
          .fa.fa-edit
      router-link(:to="link").font-weight-bold.text {{ text }}
      .clearfix
</template>

<script>
import VSelect from 'vue-select'
import 'vue-search-select/dist/VueSearchSelect.css'

export default {
  components: {
    VSelect
  },
  props: {
    value: Object,
    editMode: Boolean,
    id: String,
    options: Array,
    text: String,
    link: String,
    getOptionLabel: Function
  },
  data () {
    return {
      internEditMode: false,
      isSaving: false
    }
  },
  methods: {
    search (loading, search) {
      this.$emit('search', loading, search)
    },
    submit () {
      this.isSaving = true
      this.$emit('submit')
    }
  },
  watch: {
    value (value) {
      this.$emit('input', value)
    },
    editMode: {
      immediate: true,
      handler (editMode) {
        this.internEditMode = editMode
      }
    },
    internEditMode (editMode) {
      this.$emit('update:editMode', editMode)
      this.isSaving = false
    }
  }
}
</script>

<style lang='sass' scoped>
.right-aside-select-header-input
  padding-top: $right-aside-margin
  .text
    color: grey
</style>
