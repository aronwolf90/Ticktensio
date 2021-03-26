<template lang='pug'>
  .wiki-categories-new
    wiki-categories-form(@submit="createFolder")
      b-button(type="submit", variant="success") Create wiki category
      b-button.pull-right(variant="secondary", to="/administration/wiki") Cancel
</template>

<script>
import WikiCategoriesForm from 'components/wiki/categories/form'
import store from 'store'
import wikiCategoriesForm from 'store/modules/wiki-categories-form'

if (!store.hasModule('wikiCategoriesForm')) {
  store.registerModule('wikiCategoriesForm', wikiCategoriesForm)
}

export default {
  components: {
    WikiCategoriesForm
  },
  async beforeRouteEnter (to, _from, next) {
    await store.dispatch('wikiCategoriesForm/initializeNewForm')
    next()
  },
  methods: {
    async createFolder () {
      if (await this.$store.dispatch('wikiCategoriesForm/create')) {
        this.$router.push('/administration/wiki')
      }
    }
  }
}
</script>
