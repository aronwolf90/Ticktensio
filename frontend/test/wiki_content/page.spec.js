import Page from 'wiki_content/page'

describe('wiki_content/page.vue', () => {
  const page = {
    id: '1',
    type: 'wiki-pages',
    attributes: {
      title: 'page title',
      content: ''
    }
  }
  const factory = () => {
    return createWrapper(Page, {
      propsData: {
        pageId: '1'
      },
      mocks: {
        $store: {
          getters: {
            entry
          }
        }
      }
    })
  }
  beforeEach(() => {
    when(entry).calledWith({ id: '1', type: 'wiki-pages' })
      .mockReturnValue(page)
  })

  it('the title is present', () => {
    expect(factory().html()).toContain('page title')
  })

  it('the icon is present', () => {
    expect(factory().html()).toContain('fa-file-text-o')
  })
})
