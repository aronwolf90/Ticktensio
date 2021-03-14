import Page from 'wiki_content/page'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Page', () => {
  const entry = sandbox.stub()
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
    entry.withArgs({ id: '1', type: 'wiki-pages' }).returns(page)
  })

  it('the title is present', () => {
    expect(factory().html()).to.include('page title')
  })

  it('the icon is present', () => {
    expect(factory().html()).to.include('fa-file-text-o')
  })
})
