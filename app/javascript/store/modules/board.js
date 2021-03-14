import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    boardListRefs: null,
    projectRef: null
  },
  getters: {
    boardLists (state, _getters, _rootState, rootGetters) {
      if (!state.boardListRefs) return []
      return state.boardListRefs.map(ref => rootGetters.entry(ref))
    },
    boardListIssues (stage, _getters, _rootStage, rootGetters) {
    },
    project (state, _getters, _rootState, rootGetters) {
      return rootGetters.entry(state.projectRef)
    }
  },
  mutations: {
    boardLists (state, boardLists) {
      state.boardListRefs = Utils.entryArrayToRef(boardLists)
    },
    project (state, project) {
      state.projectRef = Utils.entryToRef(project)
    }
  },
  actions: {
    fetch (context, projectId) {
      context.commit('project', { id: projectId, type: 'projects' })
      return context.dispatch('getBoardLists', projectId)
    },
    refrech (context) {
      return context.dispatch('fetch', context.state.projectRef.id)
    },
    getBoardLists (context, projectId) {
      return context.dispatch(
        'getBoardLists',
        projectId,
        { root: true }
      ).then(response => {
        context.commit('boardLists', response.data)
        return response
      })
    },
    sortBoardLists (context, boardLists) {
      context.dispatch('sortBoardLists', boardLists, { root: true })
      context.commit('boardLists', boardLists)
    },
    setBoardListIssues (context, { boardList, issues }) {
      context.dispatch('updateBoardListIssuesOnServer', {
        boardList,
        issues
      })
      context.commit('changeManyToOneReference', {
        children: issues,
        parent: boardList,
        childRelationshipName: 'board-list',
        parentRelationshipName: 'issues',
        parentTypes: ['board-lists']
      }, { root: true })
      context.dispatch('adjustBoardListIssuesRelationshipLinks', {
        boardList,
        issues
      })
    },
    updateBoardListIssuesOnServer (context, { boardList, issues }) {
      let oldIssues = context.rootGetters.associatedEntries({ entry: boardList, name: 'issues' })
      for (let i = 0, j = 0; i < issues.length; i++, j++) {
        if (issues[i] === oldIssues[j]) continue
        context.rootGetters.axios.post(
          `${issues[i].links.self}/move`,
          {
            issue_id: issues[i].id,
            before_issue_id: i === 0 ? null : issues[i - 1].id,
            board_list_id: boardList.id
          }
        )
        if (issues[i + 1] === oldIssues[j]) i++
        if (issues[i] === oldIssues[j + 1]) j++
      }
    },
    adjustBoardListIssuesRelationshipLinks (context, { boardList, issues }) {
      let next = null
      if (boardList.relationships.issues.links.next) {
        next = `/api/v1/board_lists/${boardList.id}/issues?more_id=${issues[issues.length - 1].id}`
      }

      context.commit('relataionshipLinks', {
        entry: boardList,
        association: 'issues',
        links: {
          next: next,
          self: boardList.relationships.issues.links.self
        }
      }, { root: true })
    }
  }
}
