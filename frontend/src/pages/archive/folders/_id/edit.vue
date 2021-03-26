<template lang='pug'>
  .archive-folders-new
    archive-folders-form(@submit="updateFolder")
      b-button(type="submit", variant="success") Update folder
      .btn-group.pull-right
        form-btn-destroy(:entry-ref="folder", @destroy="destroy")
        b-button.pull-right(variant="secondary", to="/administration/archive") Cancel
</template>

<script>
import ArchiveFoldersForm from 'components/folders/form'
import FormBtnDestroy from 'components/form-btn-destroy'
import store from 'store'
import foldersForm from 'store/modules/folders-form'

if (!store.hasModule('foldersForm')) {
  store.registerModule('foldersForm', foldersForm)
}

export default {
  components: {
    ArchiveFoldersForm,
    FormBtnDestroy
  },
  async beforeRouteEnter (to, _from, next) {
    await store.dispatch('foldersForm/initializeEditForm', to.params.id)
    next()
  },
  methods: {
    async updateFolder () {
      if (await this.$store.dispatch('foldersForm/update')) {
        this.$router.push('/administration/archive')
      }
    },
    async destroy () {
      await this.$store.dispatch('destroy', this.folder)
      this.$router.push('/administration/archive')
    }
  },
  computed: {
    folder () {
      return this.$store.getters['foldersForm/folder']
    }
  }
}
</script>
