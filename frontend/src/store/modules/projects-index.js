import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    projectRefs: [],
    paginationCount: null,
    paginationCurrentPage: null,
    fetchingPage: null
  },
  getters: {
    projects (state, _getters, _rootState, rootGetters) {
      return state.projectRefs.map(projectRef => {
        return rootGetters.entry(projectRef)
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
    projects (state, projects) {
      state.projectRefs = Utils.entryArrayToRef(projects)
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
        'getProjects',
        page,
        { root: true }
      ).then(response => {
        context.commit('projects', response.data)
        context.commit('paginationCount', response.meta.count)
        context.commit('paginationCurrentPage', page || 1)
      })
    }
  }
}
