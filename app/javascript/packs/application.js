import Vue from 'vue/dist/vue.common'
import Vuex from 'vuex'
import Store from '../store'

import IssuesBoard from '../board.vue'
import Issue from '../issue.vue'
import SharedIssueSection from '../shared_issue_section'

require('../config')

Vue.component('issues_board', IssuesBoard)
Vue.component('issue', Issue)
Vue.component('shared-issue-section', SharedIssueSection)

let store = new Vuex.Store(Store)

Vue.http.headers.common['X-CSRF-Token'] =
  document.querySelector('meta[name="csrf-token"]').getAttribute('content')
Vue.http.headers.common['Content-Type'] = 'application/vnd.api+json'

document.addEventListener('turbolinks:before-visit', () => {
  store.commit('clearCalledUrls')
})

document.addEventListener('turbolinks:load', () => {
  var app = new Vue({el: '#app', store}) /* eslint-disable-line no-unused-vars */
})
