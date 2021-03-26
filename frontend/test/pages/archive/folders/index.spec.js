import PagesArchiveIndex from 'pages/archive/index'

describe('pages/archive/index', () => {
  const factory = ({ rootFolders }) => {
    return createWrapper(PagesArchiveIndex, {
      stubs: {
        folder: true
      },
      mocks: {
        $store: {
          getters: {
            rootFolders
          }
        }
      }
    })
  }

  it('renders the folders that have no a associated project', () => {
    const folder = {
      id: '1',
      type: 'folders',
      relationships: {
        project: {
          data: null
        }
      }
    }
    const wrapper = factory({ rootFolders: [folder] })

    expect(wrapper.find('folder-stub').exists()).toBeTruthy()
  })

  it('does not render the folders that have a associated project', () => {
    const folder = {
      id: '1',
      type: 'folders',
      relationships: {
        project: {
          data: {
            id: '1',
            type: 'projects'
          }
        }
      }
    }
    const wrapper = factory({ rootFolders: [folder] })

    expect(wrapper.find('folder-stub').exists()).not.toBeTruthy()
  })
})
