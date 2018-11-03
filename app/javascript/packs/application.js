import Vue from 'vue/dist/vue.common'
import Vuex from 'vuex'
import Store from '../store'

import IssuesBoard from '../board.vue'
import Issue from '../issue.vue'
import SharedIssueSection from '../shared_issue_section'
import WikiContent from '../wiki_content'
import WikiPage from '../wiki_page'
import ArchiveContent from '../archive_content'
import PersonalDashboardGraph from '../personal_dashboard_graph'
import ProjectSearchSelect from '../project_search_select'
import Calender from '../calender'

require('../config')

Vue.component('issues_board', IssuesBoard)
Vue.component('issue', Issue)
Vue.component('shared-issue-section', SharedIssueSection)
Vue.component('wiki-content', WikiContent)
Vue.component('wiki-page', WikiPage)
Vue.component('archive-content', ArchiveContent)
Vue.component('personal_dashboard_graph', PersonalDashboardGraph)
Vue.component('project-search-select', ProjectSearchSelect)
Vue.component('calender', Calender)

let store = new Vuex.Store(Store)
store.commit('setEndpoint', '/api/v1/')
store.commit('vue', Vue)

if (document.querySelector('meta[name="csrf-token"]')) {
  store.commit('headerValue', {
    key: 'X-CSRF-Token',
    value: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  })
}

store.commit('headerValue', {
  key: 'Content-Type',
  value: 'application/vnd.api+js'
})

document.addEventListener('turbolinks:before-visit', () => {
  store.commit('clearCalledUrls')
})

document.addEventListener('turbolinks:load', () => {
  var app = new Vue({ el: '#app', store }) /* eslint-disable-line no-unused-vars */
})
