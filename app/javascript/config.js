import Vue from 'vue/dist/vue.common'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Router from 'vue-router'
import AsyncComputed from 'vue-async-computed'
import BootstrapVue from 'bootstrap-vue'

require('./polyfill')

Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(Vuex)
Vue.use(AsyncComputed)
