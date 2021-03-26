import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import { when } from 'jest-when'
import 'regenerator-runtime/runtime'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.use(VueRouter)

const merge = (target, source) => {
  if (!target) return source

  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'object') target[key] = merge(target[key], source[key])
    else target[key] = source[key]
  }

  return target
}

global.entry = jest.fn()
global.dispatch = jest.fn()
global.associatedEntries = jest.fn()
global.collection = jest.fn()
global.relationship = jest.fn()
global.commit = jest.fn()
global.when = when
global.createWrapper = (element, options = {}) => {
  const router = new VueRouter()

  if (router.path !== '/') {
    router.push('/')
  }

  if (options.attachToDocument) {
    const element = document.createElement('div')
    document.body.appendChild(element)
    options.attachTo = element

    afterEach(() => {
      if (element) element.remove()
    })
  }
  const optionsCopy = {}
  for (const key of Object.keys(options)) {
    if (key !== 'attachToDocument') optionsCopy[key] = options[key]
  }

  return mount(element, merge({
    router,
    localVue,
    mocks: {
      $store: {
        dispatch,
        getters: {
          entry,
          associatedEntries,
          collection,
          relationship
        },
        commit
      }
    }
  }, optionsCopy))
}
