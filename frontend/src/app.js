import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import store from 'store'
import router from 'router'
import jQuery from 'jquery'
import App from 'app.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import jqueryFuncs from 'jquery-funcs'
import toggleAsideExpanded from 'toggle-aside-expanded'
import LoadScript from 'vue-plugin-load-script'
import Cookies from 'js-cookie'
import * as Sentry from '@sentry/vue'
import VueAnalytics from 'vue-analytics'

const $ = jQuery
window.jQuery = jQuery
window.$ = $

require('jquery-ujs')

if (Cookies.get('csrf_token')) {
  store.getters.axios.defaults.headers.common['X-CSRF-Token'] =
    Cookies.get('csrf_token')
}

require.context('images', true)

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(LoadScript)

window.jqueryFuncs = jqueryFuncs
window.toggleAsideExpanded = toggleAsideExpanded

store.commit('setEndpoint', '/api/v1/')
store.commit('vue', Vue)

if (env.SENTRY_DSN) {
  Sentry.init({
    Vue: Vue,
    dsn: env.SENTRY_DSN
  })
}

if (env.GOOGLE_ANALYTICS_ID) {
  Vue.use(VueAnalytics, {
    id: env.GOOGLE_ANALYTICS_ID,
    router
  })
}

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
  store,
  router
})
$('head').append(`<meta name="csrf-token" content="${Cookies.get('csrf_token')}" />`)
