import Board from 'pages/board-lists/index'
import List from 'components/board/list'
import ProjectSelect from 'components/board/project_select'
import SearchSelect from 'components/board/search-select'
import draggable from 'vuedraggable'

describe('pages/board-lists/index.vue', () => {
  const factory = ({ boardLists }) => {
    return createWrapper(Board, {
      stubs: {
        list: true,
        draggable,
        'project-select': true,
        'search-select': true
      },
      mocks: {
        $store: {
          getters: {
            'board/boardLists': boardLists
          },
          dispatch
        }
      }
    })
  }

  it('the SearchSelect is present', () => {
    expect(factory({ boardLists: [] })
      .findComponent(SearchSelect).exists()).toBeTruthy()
  })

  describe('with boardLists', () => {
    const boardList1 = { id: '1', type: 'board-lists' }
    const boardList2 = { id: '2', type: 'board-lists' }

    it('contain the list element', async () => {
      const wrapper = factory({ boardLists: [boardList1, boardList2] })
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(wrapper.findAllComponents(List).at(0).props().listId).toEqual('1')
      expect(wrapper.findAllComponents(List).at(1).props().listId).toEqual('2')
    })

    it('contain the board-select element', () => {
      expect(factory({ boardLists: [] }).findComponent(ProjectSelect).exists())
        .toBeTruthy()
    })

    it('change board_list order', async () => {
      const wrapper = factory({ boardLists: [boardList1, boardList2] })
      const localBoardLists = [boardList2, boardList1]
      wrapper.vm.boardLists = localBoardLists
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(dispatch)
        .toHaveBeenCalledWith('board/sortBoardLists', localBoardLists)
    })
  })

  describe('without boardLists', () => {
    it('contain the list element', () => {
      expect(factory({ boardLists: [] }).findAllComponents(List).length).toEqual(0)
    })
  })
})
