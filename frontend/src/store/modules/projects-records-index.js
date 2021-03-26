import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    projectRecordDayRefs: null,
    paginationCount: null,
    paginationCurrentPage: null,
    fetchingPage: null
  },
  getters: {
    projectRecordDays (state, _getters, _rootState, rootGetters) {
      if (!state.projectRecordDayRefs) return null

      return state.projectRecordDayRefs.map(projectRecordDayRef => {
        return rootGetters.entry(projectRecordDayRef)
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
    },
    monthSpentTime (state) {
      return state.monthSpentTime
    },
    projectId (state) {
      return state.projectId
    }
  },
  mutations: {
    projectRecordDays (state, projectRecordDays) {
      state.projectRecordDayRefs = Utils.entryArrayToRef(projectRecordDays)
    },
    paginationCount (state, paginationCount) {
      state.paginationCount = paginationCount
    },
    paginationCurrentPage (state, paginationCurrentPage) {
      state.paginationCurrentPage = paginationCurrentPage
    },
    fetchingPage (state, fetchingPage) {
      state.fetchingPage = fetchingPage
    },
    monthSpentTime (state, monthSpentTime) {
      state.monthSpentTime = monthSpentTime
    },
    projectId (state, projectId) {
      state.projectId = projectId
    }
  },
  actions: {
    fetch (context, { projectId, page }) {
      context.commit('fetchingPage', page || 1)
      return context.dispatch(
        'get', `project_record_days?include=records&page=${page || 1}&filter[project_id]=${projectId}`, { root: true }
      ).then(response => {
        context.commit('projectRecordDays', response.data)
        context.commit('paginationCount', response.meta.count)
        context.commit('paginationCurrentPage', page || 1)
        context.commit('monthSpentTime', response.meta['month-spent-time'])
        context.commit('projectId', projectId)
      })
    }
  }
}
