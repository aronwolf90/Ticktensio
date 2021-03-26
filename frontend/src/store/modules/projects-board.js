import { Utils } from 'vuex-jsonapi-client'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    projectBoardListRefs: null,
    projectBoardListProjectRefs: {},
    loadMoreLinks: {}
  },
  getters: {
    projectBoardLists (state, _getters, _rootState, rootGetters) {
      if (!state.projectBoardListRefs) return []
      return state.projectBoardListRefs.map(ref => rootGetters.entry(ref))
    },
    projectBoardListProjects (state, _getters, _rootState, rootGetters) {
      return (projectBoardList) => {
        return state.projectBoardListProjectRefs[projectBoardList.id]
          .map(ref => rootGetters.entry(ref))
      }
    },
    loadMoreLink (state) {
      return (projectBoardListId) => state.loadMoreLinks[projectBoardListId]
    }
  },
  mutations: {
    projectBoardLists (state, projectBoardLists) {
      Vue.set(state, 'projectBoardListRefs',
        Utils.entryArrayToRef(projectBoardLists))
    },
    projectBoardListProjects (state, { projectBoardList, projects }, other) {
      if (!state.projectBoardListProjectRefs) {
        state.projectBoardListProjectRefs = {}
      }
      Vue.set(state.projectBoardListProjectRefs,
        projectBoardList.id, Utils.entryArrayToRef(projects))
    },
    addProjectsToBoardLists (state, { projectBoardListId, projects }) {
      state.projectBoardListProjectRefs[projectBoardListId]
        .push(...Utils.entryArrayToRef(projects))
    },
    setLoadMoreLink (state, { projectBoardListId, link }) {
      Vue.set(state.loadMoreLinks, projectBoardListId, link)
    }
  },
  actions: {
    async fetch (context, projectStatusId) {
      const response = await context.dispatch('getProjectStatus', projectStatusId,
        { root: true }
      )
      context.commit(
        'projectBoardLists',
        Utils.relationship(response.data, 'project-board-lists')
      )
      context.getters.projectBoardLists.forEach(projectBoardList => {
        context.commit('projectBoardListProjects', {
          projectBoardList,
          projects: Utils.relationship(projectBoardList, 'projects')
        })
        context.commit('setLoadMoreLink', {
          projectBoardListId: projectBoardList.id,
          link: projectBoardList.relationships.projects.links.next
        })
      })
      return response
    },
    moveProjectBoardList (context, {
      projectBoardList,
      ordinalNumber
    }) {
      context.dispatch('updateProjectBoardList',
        {
          projectBoardList,
          payload: {
            attributes: {
              'ordinal-number': ordinalNumber
            }
          }
        },
        { root: true }
      )
    },
    moveProject (context, {
      projectBoardList,
      project,
      ordinalNumber
    }) {
      context.dispatch('updateProject',
        {
          projectBoardList,
          project,
          payload: {
            attributes: {
              'ordinal-number': ordinalNumber
            },
            relationships: {
              'project-board-list': {
                data: projectBoardList
              }
            }
          }
        },
        { root: true }
      )
    },
    loadMoreProjectForBoardListProjects (context, projectBoardList) {
      const url = projectBoardList.relationships.projects.links.next
      context.dispatch('get', { url }, { root: true }).then(response => {
        context.commit('addProjectsToBoardLists', {
          projectBoardListId: projectBoardList.id,
          projects: response.data
        })
        context.commit('setLoadMoreLink', {
          projectBoardListId: projectBoardList.id,
          link: response.links.next
        })
      })
    }
  }
}
