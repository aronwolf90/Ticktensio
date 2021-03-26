import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    form: {
      attributes: {
        title: null
      },
      relationships: {
        wikiCategory: {
          data: null
        }
      }
    },
    errors: [],
    wikiCategoryRef: null
  },
  getters: {
    formTitle (state) {
      return state.form.attributes.title
    },
    formWikiCategoryRef (state) {
      return state.form.relationships['wiki-category'].data
    },
    wikiCategoryId (state) {
      return state.wikiCategoryId
    },
    wikiCategory (state, _getters, _rootState, rootGetters) {
      return rootGetters.entry(state.wikiCategoryRef)
    },
    errors (state) {
      return state.errors
    }
  },
  mutations: {
    clear (state, comments) {
      state.form = {
        attributes: {
          title: null
        },
        relationships: {
          'wiki-category': {
            data: null
          }
        }
      }
      state.errors = []
    },
    errors (state, errors) {
      state.errors = errors
    },
    formTitle (state, title) {
      state.form.attributes.title = title
    },
    formWikiCategoryRef (state, wikiCategoryRef) {
      state.form.relationships['wiki-category'].data =
        Utils.entryToRef(wikiCategoryRef)
    },
    wikiCategoryId (state, wikiCategoryId) {
      state.wikiCategoryId = wikiCategoryId
    },
    wikiCategory (state, wikiCategory) {
      state.wikiCategoryRef = Utils.entryToRef(wikiCategory)
    }
  },
  actions: {
    initializeNewForm (context) {
      context.commit('clear')
      return context.dispatch('get', 'wiki_categories', { root: true })
    },
    async initializeEditForm (context, wikiCategoryId) {
      context.commit('clear')
      const wikiCategory = (await context.dispatch('get',
        `wiki_categories/${wikiCategoryId}`, { root: true })).data
      context.commit('wikiCategory', wikiCategory)
      context.commit('wikiCategoryId', wikiCategoryId)
      context.commit('formTitle', Utils.attribute(wikiCategory, 'title'))
      context.commit('formWikiCategoryRef',
        Utils.relationship(wikiCategory, 'wiki-category'))
    },
    create (context) {
      return context.dispatch('create', {
        resource: 'wiki_categories',
        payload: context.state.form
      }, { root: true })
        .then(() => true)
        .catch(({ data }) => {
          context.commit('errors', data.errors)
          return false
        })
    },
    update (context) {
      return context.dispatch('update', {
        entry: context.getters.wikiCategory,
        payload: context.state.form
      }, { root: true })
        .then(() => true)
        .catch(({ data }) => {
          context.commit('errors', data.errors)
          return false
        })
    }
  }
}
