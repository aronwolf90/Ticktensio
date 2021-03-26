import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    recordDayRefs: null,
    paginationCount: null,
    paginationCurrentPage: null,
    fetchingPage: null
  },
  getters: {
    recordDays (state, _getters, _rootState, rootGetters) {
      if (!state.recordDayRefs) return null

      return state.recordDayRefs.map(recordDayRef => {
        return rootGetters.entry(recordDayRef)
      })
    },
    monthSpentTime (state, _getters, _rootState, rootGetters) {
      return Utils.attribute(rootGetters.context, 'month-spent-time')
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
    recordDays (state, recordDays) {
      state.recordDayRefs = Utils.entryArrayToRef(recordDays)
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
    async fetch (context, { page, userId }) {
      context.commit('fetchingPage', page || 1)
      const id = userId || (await context.dispatch('getCurrentUser', null, { root: true })).id
      return context.dispatch(
        'get', `record_days?include=records&page=${page || 1}&filter[user_id]=${id}`, { root: true }
      ).then(response => {
        context.commit('recordDays', response.data)
        context.commit('paginationCount', response.meta.count)
        context.commit('paginationCurrentPage', page || 1)
      })
    }
  }
}
