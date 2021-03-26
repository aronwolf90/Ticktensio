<template lang='pug'>
  b-form.details-string-input(
    @submit.prevent="submit",
    :id="id"
  )
    b-input-group(v-if="internEditMode")
      b-form-input(
        v-model="value",
        :placeholder="placeholder",
        :id="`${id}-input`"
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
      .text(v-if="value") {{ value }}
      .placeholder(v-else="") {{ placeholder }}
      .clearfix
</template>

<script>

export default {
  props: {
    value: String,
    placeholder: String,
    editMode: Boolean,
    id: String
  },
  data () {
    return {
      internEditMode: false,
      isSaving: false
    }
  },
  methods: {
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
  .details-string-input
    .text
      word-break: break-word;
    .placeholder
      color: rgba(191, 191, 191, 0.87)
    input::placeholder
      color: rgba(191, 191, 191, 0.87)
    input
      padding: 3px
      height: auto
</style>
