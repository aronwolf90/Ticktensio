import JsonApi from 'vuex-jsonapi-client'
import Vuex from 'vuex'
import Vue from 'vue'

import recordActions from 'store/models/record_actions'
import issueActions from 'store/models/issue_actions'
import issueGetters from 'store/models/issue_getters'
import commentActions from 'store/models/comment_actions'
import boardListActions from 'store/models/board_list_actions'
import boardListGetters from 'store/models/board_list_getters'
import projectActions from 'store/models/project_actions'
import projectGetters from 'store/models/project_getters'
import userActions from 'store/models/user_actions'
import userGetters from 'store/models/user_getters'
import wikiCategoryActions from 'store/models/wiki_category_actions'
import wikiCategoryGetters from 'store/models/wiki_category_getters'
import wikiPageActions from 'store/models/wiki_page_actions'
import folderActions from 'store/models/folder_actions'
import folderGetters from 'store/models/folder_getters'
import userIssueActions from 'store/models/user_issue_actions'
import eventActions from 'store/models/event_actions'
import attendaceDaysActions from 'store/models/attendance_days_actions'
import attendaceEventActions from 'store/models/attendance_event_actions'
import contactActions from 'store/models/contact_actions'
import documentActions from 'store/models/document_actions'
import stripeCheckoutSessionActions from 'store/models/stripe_checkout_session_actions'
import invoiceActions from 'store/models/invoice_actions'
import subscriptionActions from 'store/models/subscription_actions'
import Board from 'store/modules/board'
import notificationActions from 'store/models/notification_actions'
import contextGetters from 'store/models/context_getters'
import contextActions from 'store/models/context_actions'
import projectStatusActions from 'store/models/project-status-actions'
import projectStatusGetters from 'store/models/project-status-getters'
import ProjectsBoard from 'store/modules/projects-board'
import projectBoardListGetters from 'store/models/project-board-list-getters'
import projectBoardListActions from 'store/models/project-board-list-actions'
import projectCommentActions from 'store/models/project-comment-actions'
import projectCommentGetters from 'store/models/project-comment-getters'
import commentGetters from 'store/models/comment-getters'
import documentGetters from 'store/models/document-getters'
import CalendarActions from 'store/models/calendar_actions'
import LabelActions from 'store/models/label-actions'
import ProjectsLeftAside from 'store/modules/projects-left-aside'
import recordsForm from 'store/modules/records-form'
import projectsRecordsIndex from 'store/modules/projects-records-index'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    json_api: JsonApi,
    board: Board,
    'projects-board': ProjectsBoard,
    projectsLeftAside: ProjectsLeftAside,
    recordsForm,
    projectsRecordsIndex
  },
  state: {
    aside: null,
    prevPath: '/administration'
  },
  mutations: {
    setAside (state, name) {
      state.aside = name
    },
    setPrevPath (state, path) {
      state.prevPath = path
    }
  },
  getters: {
    ...userGetters,
    ...folderGetters,
    ...wikiCategoryGetters,
    ...boardListGetters,
    ...projectGetters,
    ...issueGetters,
    ...contextGetters,
    ...projectStatusGetters,
    ...projectBoardListGetters,
    ...projectCommentGetters,
    ...commentGetters,
    ...documentGetters,

    currentUser (store) {
      const entry = JsonApi.getters.entry(store.json_api)({
        type: 'contexts',
        id: 'context'
      })

      return JsonApi.getters.associatedEntry(store.json_api)({
        entry,
        name: 'current-user'
      })
    },
    currentRecord (store, getters) {
      return JsonApi.getters.associatedEntry(store.json_api)({
        entry: getters.currentUser,
        name: 'current-record'
      })
    },
    currentIssue (state, getters) {
      return getters.associatedEntry({
        entry: getters.currentRecord,
        name: 'issue'
      })
    },
    relevantProjects (state, getters) {
      return (searchText) => {
        if (!getters.collection('projects')) return
        const relevantProjects = getters.collection('projects').slice()
        return relevantProjects.filter(relevantProject => {
          return relevantProject.attributes.name.includes(searchText)
        })
      }
    },
    attendanceEventForDay (state, getters) {
      return ({ day, userId }) => {
        return (getters.collection('attendance-events') || []).find(event => {
          return (
            (
              Date.parse(event.attributes['from-day']) <= Date.parse(day) &&
              Date.parse(event.attributes['to-day']) >= Date.parse(day)
            ) ||
              Date.parse(event.attributes['from-day']) === Date.parse(day)
          ) &&
            userId === event.relationships.user.data.id
        })
      }
    },
    aside (state) {
      return state.aside
    },
    prevPath (state) {
      return state.prevPath
    }
  },
  actions: {
    ...boardListActions,
    ...commentActions,
    ...issueActions,
    ...projectActions,
    ...recordActions,
    ...userActions,
    ...wikiCategoryActions,
    ...wikiPageActions,
    ...folderActions,
    ...userIssueActions,
    ...eventActions,
    ...attendaceDaysActions,
    ...attendaceEventActions,
    ...contactActions,
    ...documentActions,
    ...stripeCheckoutSessionActions,
    ...invoiceActions,
    ...subscriptionActions,
    ...notificationActions,
    ...contextActions,
    ...projectStatusActions,
    ...projectBoardListActions,
    ...projectCommentActions,
    ...CalendarActions,
    ...LabelActions,

    initCurrentUser (context) {
      return context.dispatch('getContext').then(response => {
        return context.dispatch('loadRelationship', {
          entry: response.data,
          name: 'current-user'
        })
      })
    },
    getCurrentUser (context) {
      return context.dispatch('getContext').then(response => {
        return context.dispatch('loadRelationship', {
          entry: response.data,
          name: 'current-user'
        })
      })
    },
    initCurrentRecord (context) {
      return context.dispatch('initCurrentUser').then(currentUser => {
        return context.dispatch('loadRelationship', {
          entry: currentUser,
          name: 'current-record'
        })
      })
    }
  }
})
