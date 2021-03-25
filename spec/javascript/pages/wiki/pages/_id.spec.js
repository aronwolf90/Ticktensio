// import { shallow, createLocalVue } from '@vue/test-utils'
// import Vuex from 'vuex'
// import Show from 'pages/wiki/pages/_id'
// import MarkdownViewer from 'markdown_viewer'
// import sinon from 'sinon'
// import BootstrapVue from 'bootstrap-vue'
// import VueRouter from 'vue-router'

// const localVue = createLocalVue()

// LocalVue.use(Vuex)
// LocalVue.use(VueRouter)
// LocalVue.use(BootstrapVue)

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

// describe('Show', () => {
//  subject(() => shallow(Show, { store: $store, localVue, router: new VueRouter() }))
//
//  def('getters', () => ({ entry () { return () => $wikiPage } }))
//  def('actions', () => ({ initWikiPage () {} }))
//  def('store', () => (new Vuex.Store({ state: {}, getters: $getters, actions: $actions })))
//  def('Turbolinks', () => ({ visit: sinon.spy() }))
//
//  describe('with wikiPage', () => {
//    def('wikiPage', () => ({
//      id: 1,
//      type: 'wiki-pages',
//      attributes: { title: 'wiki page title', content: 'content' }
//    }))
//
//    it("has wiki pages's title", () => {
//      expect($subject.html()).to.include('wiki page title')
//    })
//
//    it('pass content to the markdown_viewer', () => {
//      expect($subject.find(MarkdownViewer).props().value).to.eq('content')
//    })
//  })
//
//  describe('without wiki_page', () => {
//    def('wikiPage', () => undefined)
//
//    it('render nothing', () => {
//      expect($subject.html()).to.be.empty
//    })
//  })
// })
