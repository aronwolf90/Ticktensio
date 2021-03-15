import Category from 'wiki_content/category'
import Page from 'wiki_content/page'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Category', () => {
  const entry = sandbox.stub()
  const associatedEntries = sandbox.stub()
  const category = { id: 1, attributes: { title: 'category title' } }
  const childCategory = { id: 2, title: 'child category title' }
  const page = { id: 1, attributes: { title: 'page title', content: '' } }
  const factory = () => {
    return createWrapper(Category, {
      mocks: {
        $store: {
          getters: {
            entry,
            associatedEntries
          }
        }
      },
      propsData: {
        categoryId: 1
      }
    })
  }
  beforeEach(() => {
    entry.withArgs({ type: 'wiki-categories', id: 1 }).returns(category)
    entry.withArgs({ type: 'wiki-categories', id: 2 }).returns(childCategory)
    associatedEntries.returns([])
    associatedEntries.withArgs({ entry: category, name: 'wiki-categories' }).returns([childCategory])
    associatedEntries.withArgs({ entry: category, name: 'wiki-pages' }).returns([page])
  })

  it('the title is present', () => {
    expect(factory().html()).to.include('category title')
  })

  it('the category icon is present', () => {
    expect(factory().html()).to.include('fa-tags')
  })

  it('render the child category', () => {
    expect(factory().find(Category).exists()).to.be.true
  })

  it('render the page', () => {
    expect(factory().find(Page).exists()).to.be.true
  })
})
