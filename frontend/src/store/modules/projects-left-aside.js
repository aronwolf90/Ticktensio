import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    projectStatusesRefs: []
  },
  getters: {
    projectStatuses (state, _getters, _rootState, rootGetters) {
      return state.projectStatusesRefs.map(projectStatusRef => {
        return rootGetters.entry(projectStatusRef)
      })
    }
  },
  mutations: {
    projectStatuses (state, projectStatuses) {
      state.projectStatusesRefs = Utils.entryArrayToRef(projectStatuses)
    }
  },
  actions: {
    fetch (context, id) {
      context.dispatch('getProjectStatuses', null, { root: true }).then(response => {
        context.commit('projectStatuses', response.data)
      })
    }
  }
}
