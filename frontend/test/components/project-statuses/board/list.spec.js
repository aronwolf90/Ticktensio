import List from 'components/project-statuses/board/list'

describe('project-statuses/board/list', () => {
  const projectBoardList = {
    id: '1',
    type: 'project-board-lists',
    attributes: {
      name: 'Project board list name'
    },
    relationships: {
      projects: {
        links: {
          next: '/next'
        }
      }
    }
  }
  const project = {
    id: '1',
    type: 'projects',
    attributes: {
      name: 'Name'
    }
  }
  const factory = () => {
    return createWrapper(List, {
      mocks: {
        $store: {
          getters: {
            'projects-board/projectBoardListProjects': () => [project],
            'projects-board/loadMoreLink': () => '/next',
            project: () => project,
            projectBoardList: () => projectBoardList
          }
        }
      },
      propsData: {
        projectBoardListId: '1'
      },
      stubs: {
        project: true,
        draggable: true
      }
    })
  }

  it('render project board list name', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('Project board list name')
  })

  it('render project board list name', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('project-stub')
  })

  it('renders more', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('more')
  })
})
