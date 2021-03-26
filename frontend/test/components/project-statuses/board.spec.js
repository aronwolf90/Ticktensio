import Board from 'components/project-statuses/board'

describe('components/project-statuses/board.vue', () => {
  const projectBoardList = {
    id: '1',
    type: 'project-board-lists',
    attributes: {
      name: 'Name'
    }
  }

  it('render project name', async () => {
    const wrapper = createWrapper(Board, {
      mocks: {
        $store: {
          getters: {
            projectBoardList: () => projectBoardList,
            'projects-board/projectBoardLists': [projectBoardList]
          }
        }
      },
      propsData: {
        projectStatusId: '1'
      },
      stubs: {
        list: true,
        draggable: true
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('list-stub').props()).toEqual({ projectBoardListId: '1' })
  })
})
