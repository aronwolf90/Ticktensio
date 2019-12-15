import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    boardListRefs: null
  },
  getters: {
    boardLists (state, _getters, _rootState, rootGetters) {
      if (!state.boardListRefs) return []
      return state.boardListRefs.map(ref => rootGetters.entry(ref))
    }
  },
  mutations: {
    boardLists (state, boardLists) {
      state.boardListRefs = Utils.entryArrayToRef(boardLists)
    }
  },
  actions: {
    getBoardLists (context) {
      context.dispatch('getBoardLists', null, { root: true }).then(response => {
        context.commit('boardLists', response.data)
      })
    },
    sortBoardLists (context, boardLists) {
      context.dispatch('sortBoardLists', boardLists, { root: true })
      context.commit('boardLists', boardLists)
    }
  }
}
