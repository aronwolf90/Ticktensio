<template lang='pug'>
  b-form(@submit.prevent="submit")
    form-text-input(
      id="input-title",
      v-model="form.attributes.title",
      label="Title",
      :errors="errors",
      error-path="attributes/title"
    )
    form-select(
      id="input-wiki-category",
      v-model="form.relationships['wiki-category'].data",
      label="Wiki category",
      :errors="errors",
      :options="wikiCategoryOptions",
      error-path="relationships/wiki-category"
    )
    b-button(type="submit", variant="success") Create wiki page
    b-button.pull-right(variant="secondary", to="..") Cancel
</template>

<script>
import { Utils } from 'vuex-jsonapi-client'
import FormTextInput from 'components/form-inputs/text'
import FormSelect from 'components/form-inputs/select'
import store from 'store'

export default {
  components: {
    FormTextInput,
    FormSelect
  },
  data () {
    return {
      form: {
        attributes: {
          title: null
        },
        relationships: {
          'wiki-category': {
            data: null
          }
        }
      },
      errors: [],
      wikiCategoryRefs: []
    }
  },
  async beforeRouteEnter (to, from, next) {
    const response = await store.dispatch('get', 'wiki_categories')
    next(vm => {
      vm.wikiCategoryRefs = Utils.entryArrayToRef(response.data)
    })
  },
  computed: {
    wikiCategoryOptions () {
      return this.wikiCategoryRefs.map(wikiCategoryRef => {
        const wikiCategory = this.$store.getters.entry(wikiCategoryRef)
        return {
          text: Utils.attribute(wikiCategory, 'title'),
          value: wikiCategoryRef
        }
      })
    }
  },
  methods: {
    submit () {
      console.log(JSON.stringify(this.form))
      this.$store.dispatch('create', {
        resource: 'wiki_pages',
        payload: this.form
      }).then(response => {
        this.$router.push('..')
      }).catch(({ status, data }) => {
        this.errors = data.errors
      })
    },
    wikiCategoryLabel (wikiCategoryRef) {
      Utils.attribute(this.$store.getters(wikiCategoryRef), 'name')
    }
  }
}
</script>
