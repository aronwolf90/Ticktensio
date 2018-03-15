import Vue from 'vue/dist/vue.common'
import JsonApi from 'store/json_api'

import JsonApiGetters from "store/json_api/getters"

export default {
  strict: true,
  modules: {
    json_api: JsonApi
  },
  state: {
  },
  getters: {
    currentUser(store) {
      let entry = JsonApiGetters.get(store.json_api)({
        type: "contexts",
        id: "context"
      })

      return JsonApiGetters.getAssociatedEntry(store.json_api)({
        entry,
        name: "current-user"
      })
    },
    currentRecord(store) {
      let context = JsonApiGetters.get(store.json_api)({
        type: "contexts",
        id: "context"
      })

      let current_user = JsonApiGetters.getAssociatedEntry(store.json_api)({
        entry: context,
        name: "current-user"
      })

      return JsonApiGetters.getAssociatedEntry(store.json_api)({
        entry: current_user,
        name: "current-record"
      })
    }
  },
  actions: {
    initCurrentUser(context) {
      return context.dispatch("initContext").then(context_entry => {
        return context.dispatch("initRelatedEntry", {
          entry: context_entry,
          name: "current-user"
        })
      })
    },
    initCurrentRecord(context) {
      return context.dispatch("initCurrentUser").then(current_user => {
        return context.dispatch("initRelatedEntry", {
          entry: current_user,
          name: "current-record"
        })
      })
    },
    initIssue(context, issue_id) {
      return context.dispatch('initEntry', `/api/v1/issues/${issue_id}`)
    },
    initContext(context) {
      return context.dispatch('initEntry', '/api/v1/context')
    },
    initBoardsLists(context) {
      return context.dispatch('initCollection', '/api/v1/board_lists')
    },
    initUsers(context) {
      return context.dispatch('initCollection', '/api/v1/users/')
    },
    updateBoardListIssues(context, { id, issues }) {
      context.commit('updateBoardListIssues', { id: id, issues: issues})
      let board_list = context.state.board_lists.find(board_list => board_list.id == id)

      Vue.http.put(`/api/v1/board_lists/${board_list.id}`, { board_list }).then(response => {
      }, response => {
        alert(response)
      })
    },
    updateContext(context, board_lists) {

    },
    createComment(context, { issue, user, attributes, func_success }) {
      let payload = {
        attributes,
        "relationships": {
          "issue": {
            "data": {
              "id": issue.id,
              "type": issue.type
            }
          },
          "user": {
            "data": {
              "id": user.id,
              "type": user.type
            }
         } }
      }

      context.dispatch('create', {
        url: `/api/v1/comments`,
        payload,
        func_success: (comment) => {
          context.commit('addToMultiple', {
            parent: issue,
            child: comment,
            relationship_name: 'comments'
          })
          context.commit('addToMultiple', {
            parent: user,
            child: comment,
            relationship_name: 'comments'
          })
          if (func_success) func_success()
        }
      })
    },
    createRecord(context, { attributes, user, issue, func_success }) {
      context.dispatch('create', {
        url: `/api/v1/records`,
        payload: {
          attributes,
          relationships: {
            user: { data: user },
            issue: { data: issue }
	    } }
      }).then(record => {
        context.commit("setAssociation", {
          parent: record,
          child: user,
          relationship_name: 'current-record'
        })
      })
    },
    updateRecord(context, { entry, payload }) {
      context.dispatch("update", { entry, payload })
      if (payload.attributes["end-time"] && context.getters.currentRecord.id == entry.id) {
        context.commit("setAssociation", {
          parent: null,
          child: context.getters.currentUser,
          relationship_name: "current-record"
        })
      }
    },
    changeIssueToUserReference(context, { issue, user, func_success }) {
      context.dispatch('changeOneToManyReference', {
        child: issue,
        parent: user,
        child_relationship_name: 'user',
        parent_relationship_name: 'issues',
      })
    }
  }
}
