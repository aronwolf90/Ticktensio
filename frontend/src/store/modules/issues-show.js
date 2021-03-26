import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    commentRefs: [],
    boardListRefs: [],
    projectRefs: [],
    issueId: null
  },
  getters: {
    comments (state, _getters, rootState, rootGetters) {
      return state.commentRefs.map(ref => {
        return rootGetters.comment(ref.id)
      })
    },
    issue (state, _getters, rootState, rootGetters) {
      return rootGetters.issue(state.issueId)
    },
    currentUser (state, _getters, rootState, rootGetters) {
      return rootGetters.currentUser
    },
    boardLists (state, _getters, rootState, rootGetters) {
      return state.boardListRefs.map(ref => {
        return rootGetters.entry(ref)
      })
    },
    projects (state, _getters, rootState, rootGetters) {
      return state.projectRefs.map(ref => {
        return rootGetters.entry(ref)
      })
    }
  },
  mutations: {
    comments (state, comments) {
      state.commentRefs = Utils.entryArrayToRef(comments)
    },
    issueId (state, issueId) {
      state.issueId = issueId
    },
    boardLists (state, boardLists) {
      state.boardListRefs = Utils.entryArrayToRef(boardLists)
    },
    project (state, project) {
      state.projectRef = Utils.entryToRef(project)
    },
    projects (state, projects) {
      state.projectRefs = Utils.entryArrayToRef(projects)
    }
  },
  actions: {
    fetch (context, id) {
      context.commit('issueId', id)
      const getIssuePromisse = context.dispatch('get', `issues/${id}?include=board_list,project`, { root: true })
      const getIssuesCommentsPromise = context.dispatch('getIssueComments', id, { root: true }).then(response => {
        context.commit('comments', response.data)
      })
      const getLabelsPromise = context.dispatch('getLabels', null, { root: true })
      const getBoardListsPromise = context.dispatch('getBoardLists',
        null, { root: true }
      ).then(response => {
        context.commit('boardLists', response.data)
      })
      const getProjectsPromisse = context.dispatch('getProjects')
      return Promise.all([
        getIssuePromisse,
        getIssuesCommentsPromise,
        getLabelsPromise,
        getBoardListsPromise,
        getProjectsPromisse
      ])
    },
    createComment (context, payload) {
      payload.relationships = {
        issue: {
          data: context.getters.issue
        },
        user: {
          data: context.getters.currentUser
        }
      }

      return context.dispatch(
        'createComment',
        payload,
        { root: true }
      ).then(response => {
        context.commit('comments', context.getters.comments.concat(response.data.data))
      })
    },
    updateBoardList (context, boardList) {
      return context.dispatch(
        'updateIssue',
        {
          entry: context.getters.issue,
          boardList: Utils.entryToRef(boardList)
        },
        { root: true }
      )
    },
    getProjects (context, text = '') {
      return context.dispatch(
        'get',
        `projects?query=${text}`,
        { root: true }
      ).then(response => {
        context.commit('projects', response.data)
        return response
      })
    },
    updateProject (context, project) {
      return context.dispatch(
        'update',
        {
          entry: context.getters.issue,
          payload: {
            relationships: {
              project: {
                data: Utils.entryToRef(project)
              }
            }
          }
        },
        { root: true }
      ).then(() => {
        return context.dispatch('fetch', context.getters.issue.id)
      })
    }
  }
}
