import JsonApi from 'vuex-jsonapi-client'

import recordActions from 'store/models/record_actions'
import issueActions from 'store/models/issue_actions'
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

export default {
  strict: true,
  modules: {
    json_api: JsonApi
  },
  getters: {
    ...userGetters,
    ...folderGetters,
    ...wikiCategoryGetters,
    ...boardListGetters,
    ...projectGetters,
    currentUser (store) {
      let entry = JsonApi.getters.entry(store.json_api)({
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
        let relevantProjects = getters.collection('projects').slice()
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

    initCurrentUser (context) {
      return context.dispatch('initContext').then(response => {
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
}
