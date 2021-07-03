import WikiPagesIdIndex from 'pages/wiki/pages/_id/index'

describe('pages/wiki/pages/_id/index.vue', () => {
  const wikiPage = {
    id: '1',
    type: 'wiki-pages',
    attributes: {
      title: 'Test title',
      content: 'Test content'
    }
  }

  const factory = () => {
    return createWrapper(WikiPagesIdIndex, {
      stubs: {
        markdownViewer: true
      },
      propsData: {
        wikiPageId: '1'
      }
    })
  }

  beforeEach(() => {
    when(entry)
      .calledWith({ type: 'wiki-pages', id: '1' })
      .mockReturnValue(wikiPage)
  })

  it("has wiki pages's content", () => {
    expect(factory().find('markdownviewer-stub').vm.value)
      .toEqual('Test content')
  })
})
