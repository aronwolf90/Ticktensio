import 'stylesheets/devise.sass'

import Vue from 'vue/dist/vue.common'
import store from '../store'
import router from 'router'

import SharedIssueSection from 'components/shared-issue-section'
import ProjectSearchSelect from '../project_search_select'
import Timepicker from '../components/timepicker'
import Datepicker from '../components/datepicker'
import NotificationBell from '../components/notification_bell'
import ProjectsLeftAside from 'components/projects-left-aside'
import MarkdownEditor from 'markdown_editor'
import ProjectsDetailLeftAside from 'components/projects-detail-left-aside'
import LeftAside from 'components/left-aside'
import MenuItem from 'components/menu-item'
import Asides from 'components/asides'
import BtnSubmit from 'components/btn-submit'
import 'vue-select/dist/vue-select.css'
import VueAnalytics from 'vue-analytics'
import * as Sentry from '@sentry/browser'
import vSelect from 'vue-select'
import 'bootstrap'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'stylesheets/administration.sass'
import LoadScript from 'vue-plugin-load-script'

import jQuery from 'jquery'
const $ = jQuery
window.jQuery = jQuery
window.$ = $

require('jquery-ujs')
require.context('../images', true)

require('../config')

Vue.component('shared-issue-section', SharedIssueSection)
Vue.component('project-search-select', ProjectSearchSelect)
Vue.component('timepicker', Timepicker)
Vue.component('datepicker', Datepicker)
Vue.component('notification-bell', NotificationBell)
Vue.component('projects-left-aside', ProjectsLeftAside)
Vue.component('markdown-editor', MarkdownEditor)
Vue.component('projects-detail-left-aside', ProjectsDetailLeftAside)
Vue.component('left-aside', LeftAside)
Vue.component('menu-item', MenuItem)
Vue.component('asides', Asides)
Vue.component('btn-submit', BtnSubmit)
Vue.component('v-select', vSelect)

store.commit('setEndpoint', '/api/v1/')
store.commit('vue', Vue)
window.store = store

Vue.use(LoadScript)

if (document.querySelector('meta[name="csrf-token"]')) {
  store.getters.axios.defaults.headers.common['X-CSRF-Token'] =
    document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

window.Sentry = Sentry
if (window.sentry_dsn) {
  window.Sentry.init({ dsn: window.sentry_dsn })
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.googleAnalyticsId) {
    Vue.use(VueAnalytics, {
      id: window.googleAnalyticsId,
      router
    })
  }

  window.app = new Vue({ el: '#app', store, router }) /* eslint-disable-line no-unused-vars */
  window.jqueryFuncs()
})

window.toggleAsideExpanded = function (status) {
  const sideMenu = document.getElementsByClassName('side-menu')
  if (status === undefined) {
    sideMenu[0].classList.toggle('expanded')
    window.leftAsideExpanded = !window.leftAsideExpanded
    document.querySelector('#side-toggle-btn > .fa').classList.toggle('fa-angle-right')
    document.querySelector('#side-toggle-btn > .fa').classList.toggle('fa-angle-left')
  } else if (status === false) {
    sideMenu[0].classList.remove('expanded')
    window.leftAsideExpanded = false
    document.querySelector('#side-toggle-btn > .fa').classList.remove('fa-angle-right')
    document.querySelector('#side-toggle-btn > .fa').classList.remove('fa-angle-left')
    document.querySelector('#side-toggle-btn > .fa').classList.add('fa-angle-right')
  }
}

window.jqueryFuncs = () => {
  $('.datetimepicker').datetimepicker({
    sideBySide: true,
    format: 'YYYY-MM-DD HH:mm'
  })
  $('.datepicker').datetimepicker({
    format: 'YYYY-MM-DD'
  })
  $('.timepicker').datetimepicker({
    format: 'HH:mm'
  })
  $('[data-toggle="tooltip"]').tooltip()
  $('body, [data-dismiss="modal"]').click(() => {
    return $('.modal').modal('hide')
  })
  $('.modal-content').click(event => event.stopPropagation())

  if (document.getElementById('side-toggle-btn').binded) return
  document.getElementById('side-toggle-btn').binded = true

  document.getElementById('side-toggle-btn').addEventListener('click', (event) => {
    toggleAsideExpanded()
  })
}

jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'fa fa-clock',
    date: 'fa fa-calendar',
    up: 'fa fa-arrow-up',
    down: 'fa fa-arrow-down',
    previous: 'fa fa-chevron-left',
    next: 'fa fa-chevron-right',
    today: 'fa fa-calendar-check',
    clear: 'fa fa-trash-alt',
    close: 'fa fa-times-circle'
  }
})
