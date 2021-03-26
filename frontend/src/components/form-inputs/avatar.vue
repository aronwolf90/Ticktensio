<template lang='pug'>
  b-form-group.form-input-avatar(
    :id="`input-group-${id}`",
    :label="label",
    :label-for="id"
  )
    label.d-flex.justify-content-center(:for="`input-${id}`")
      .d-flex.flex-column.justify-content-center
        img.img-thumbnail(
          ref="previewImage",
          :src="src"
        )
    b-progress.mb-2(
      :value="progress",
      :max="100"
    )
    b-form-file(
      placeholder="Choose a file...",
      @input="changeFile",
      drop-placeholder="Drop file here...",
      :id="`input-${id}`"
    )
</template>

<script>

export default {
  props: {
    id: String,
    label: String,
    avatarUrl: String,
    apiUrl: String
  },
  data () {
    return {
      previewImage: null,
      progress: 0
    }
  },
  computed: {
    src () {
      return this.previewImage || this.avatarUrl || require('images/avatar_placeholder.png')
    }
  },
  methods: {
    changeFile (file) {
      let formData = new FormData()
      let reader = new FileReader()
      reader.onload = (event) => {
        this.previewImage = event.target.result
      }
      reader.readAsDataURL(file)
      let headers = { 'Content-Type': 'multipart/form-data' }
      formData.append('data[file]', file)
      let that = this
      this.progress = 40

      this.$store.getters.axios.post(this.apiUrl, formData, { headers })
        .then(response => {
          that.$emit('change', response.data.data)
          that.$emit('input', response.data.data)
          this.progress = 100
        })
    }
  }
}
</script>

<style lang='sass'>
.form-input-avatar
  height: 310px
  .bv-no-focus-ring
    height: 260px
    label
      height: 100%
      img
        max-height: 100%
</style>
