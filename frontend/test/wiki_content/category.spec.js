import Category from 'wiki_content/category'
import Page from 'wiki_content/page'

describe('Category', () => {
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
    when(entry)
      .calledWith({ type: 'wiki-categories', id: 1 })
      .mockReturnValue(category)
    when(entry)
      .calledWith({ type: 'wiki-categories', id: 2 })
      .mockReturnValue(childCategory)
    when(associatedEntries)
      .mockReturnValue([])
      .calledWith({ entry: category, name: 'wiki-categories' })
      .mockReturnValue([childCategory])
      .calledWith({ entry: category, name: 'wiki-pages' })
      .mockReturnValue([page])
  })

  it('the title is present', () => {
    expect(factory().html()).toContain('category title')
  })

  it('the category icon is present', () => {
    expect(factory().html()).toContain('fa-tags')
  })

  it('render the child category', () => {
    expect(factory().findComponent(Category).exists()).toBeTruthy()
  })

  it('render the page', () => {
    expect(factory().findComponent(Page).exists()).toBeTruthy()
  })
})
