import WikiContent from 'pages/wiki/index'
import Category from 'wiki_content/category'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('WikiContent', () => {
  it('contain the category', () => {
    const dispatch = sandbox.stub()
    const entry = sandbox.stub()
    const associatedEntries = sandbox.stub()
    const category = {
      id: 1,
      type: 'wiki-category',
      attributes: { root: true }
    }
    const wrapper = createWrapper(WikiContent, {
      stubs: {
        category: Category
      },
      mocks: {
        $store: {
          getters: {
            rootWikiCategories: [category],
            entry,
            associatedEntries
          },
          dispatch
        }
      }
    })
    expect(wrapper.findComponent(Category).exists()).to.be.true
  })
})
