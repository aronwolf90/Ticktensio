import Vue from 'vue/dist/vue.common'
import Vuex from 'vuex'
import { Button } from 'bootstrap-vue/es/components'
import { FormInput } from 'bootstrap-vue/es/components'
import { Modal } from 'bootstrap-vue/es/components'
import { Dropdown } from 'bootstrap-vue/es/components'
import { FormTextarea } from 'bootstrap-vue/es/components'
import { FormGroup } from 'bootstrap-vue/es/components'
import { Form } from 'bootstrap-vue/es/components'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Store from './store'

import IssuesBoard from './board.vue'
import Issue from './issue.vue'
import Router from 'vue-router'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(TurbolinksAdapter)
Vue.use(VueResource)
Vue.use(Button)
Vue.use(FormInput)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(FormTextarea)
Vue.use(FormGroup)

Vue.component('issues_board', IssuesBoard)
Vue.component('issue', Issue)