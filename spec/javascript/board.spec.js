import Board from 'pages/board-lists/index'
import List from 'board/list'
import ProjectSelect from 'board/project_select'
import SearchSelect from 'board/search_select'
import draggable from 'vuedraggable'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Board', () => {
  const dispatch = sandbox.stub()
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
    expect(factory({ boardLists: [] }).find(SearchSelect).exists()).to.be.true
  })

  describe('with boardLists', () => {
    const boardList1 = { id: '1', type: 'board-lists' }
    const boardList2 = { id: '2', type: 'board-lists' }

    it('contain the list element', async () => {
      const wrapper = factory({ boardLists: [boardList1, boardList2] })
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll(List).at(0).props().listId).to.be.eq('1')
      expect(wrapper.findAll(List).at(1).props().listId).to.be.eq('2')
    })

    it('contain the board-select element', () => {
      expect(factory({ boardLists: [] }).find(ProjectSelect).exists()).to.be.true
    })

    it('change board_list order', async () => {
      const wrapper = factory({ boardLists: [boardList1, boardList2] })
      let localBoardLists = [boardList2, boardList1]
      wrapper.vm.boardLists = localBoardLists
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(dispatch).to.have.been.calledWith('board/sortBoardLists', localBoardLists)
    })
  })

  describe('without boardLists', () => {
    it('contain the list element', () => {
      expect(factory({ boardLists: [] }).findAll(List).length).to.eq(0)
    })
  })
})
