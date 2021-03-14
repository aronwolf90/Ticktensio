import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Category from 'wiki_content/category'
import Page from 'wiki_content/page'
const localVue = createLocalVue()

localVue.use(Vuex)

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Category', () => {
  subject(() => shallow(Category,
    { store: $store, localVue, propsData: { categoryId: 1 } }))

  def('getters', () => ({
    entry () {
      return ({ id }) => {
        if (id === 1) return $category
        return $childCategory
      }
    },
    associatedEntries () {
      return ({ entry, name }) => {
        if (entry !== $category) return []
        if (name === 'wiki-categories') return $childCategories
        return $pages
      }
    }
  }))
  def('store', () => (new Vuex.Store({ state: {}, getters: $getters })))

  def('category', () => ({ id: 1, attributes: { title: 'category title' } }))
  def('childCategory', () => ({ id: 2, title: 'child category title' }))
  def('childCategories', () => [$childCategory])
  def('page', () => ({ id: 1, attributes: { title: 'page title', content: '' } }))
  def('pages', () => [$page])

  it('the title is present', () => {
    expect($subject.html()).to.include('category title')
  })

  it('the category icon is present', () => {
    expect($subject.html()).to.include('fa-tags')
  })

  it('render the child category', () => {
    expect($subject.find(Category).exists()).to.be.true
  })

  it('render the page', () => {
    expect($subject.find(Page).exists()).to.be.true
  })
})
