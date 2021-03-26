import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    contactRefs: [],
    paginationCount: null,
    paginationCurrentPage: null,
    fetchingPage: null
  },
  getters: {
    contacts (state, _getters, _rootState, rootGetters) {
      return state.contactRefs.map(contactRef => {
        return rootGetters.entry(contactRef)
      })
    },
    paginationCount (state) {
      return state.paginationCount
    },
    paginationCurrentPage (state) {
      return state.paginationCurrentPage
    },
    fetchingPage (state) {
      return state.fetchingPage
    },
    paginationPageCount (state, getters) {
      return Math.ceil(getters.paginationCount / 10)
    }
  },
  mutations: {
    contacts (state, contacts) {
      state.contactRefs = Utils.entryArrayToRef(contacts)
    },
    paginationCount (state, paginationCount) {
      state.paginationCount = paginationCount
    },
    paginationCurrentPage (state, paginationCurrentPage) {
      state.paginationCurrentPage = paginationCurrentPage
    },
    fetchingPage (state, fetchingPage) {
      state.fetchingPage = fetchingPage
    }
  },
  actions: {
    fetch (context, page) {
      context.commit('fetchingPage', page || 1)
      return context.dispatch(
        'get', 'contacts', { root: true }
      ).then(response => {
        context.commit('contacts', response.data)
        context.commit('paginationCount', response.meta.count)
        context.commit('paginationCurrentPage', page || 1)
      })
    }
  }
}
