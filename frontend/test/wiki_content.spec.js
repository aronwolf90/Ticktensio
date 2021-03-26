import WikiContent from 'pages/wiki/index'
import Category from 'wiki_content/category'

describe('WikiContent', () => {
  it('contain the category', () => {
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
    expect(wrapper.findComponent(Category).exists()).toBeTruthy()
  })
})
