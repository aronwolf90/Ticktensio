<template lang='pug'>
  .wiki-categories-edit
    wiki-categories-form(@submit="updateFolder")
      b-button(type="submit", variant="success") Update category
      .btn-group.pull-right
        form-btn-destroy(:entry-ref="wikiCategory", @destroy="destroy")
        b-button.pull-right(variant="secondary", to="/administration/wiki") Cancel
</template>

<script>
import WikiCategoriesForm from 'components/wiki/categories/form'
import FormBtnDestroy from 'components/form-btn-destroy'
import store from 'store'
import wikiCategoriesForm from 'store/modules/wiki-categories-form'

if (!store.hasModule('wikiCategoriesForm')) {
  store.registerModule('wikiCategoriesForm', wikiCategoriesForm)
}

export default {
  components: {
    WikiCategoriesForm,
    FormBtnDestroy
  },
  async beforeRouteEnter (to, _from, next) {
    await store.dispatch('wikiCategoriesForm/initializeEditForm', to.params.id)
    next()
  },
  methods: {
    async updateFolder () {
      if (await this.$store.dispatch('wikiCategoriesForm/update')) {
        this.$router.push('/administration/wiki')
      }
    },
    async destroy () {
      await this.$store.dispatch('destroy', this.wikiCategory)
      this.$router.push('/administration/wiki')
    }
  },
  computed: {
    wikiCategory () {
      return this.$store.getters['wikiCategoriesForm/wikiCategory']
    }
  }
}
</script>
