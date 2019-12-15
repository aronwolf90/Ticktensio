import Board from '../../../../app/javascript/store/modules/board.js'
import sinon from 'sinon'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Modules.Board', () => {
  describe('.getters', () => {
    describe('.boardLists', () => {
      subject(() => Board.getters.boardLists($state, {}, {}, $rootGetters))
      def('state', () => ({
        boardListRefs: [
          { id: '1', type: 'board-lists' },
          { id: '2', type: 'board-lists' }
        ]
      }))
      def('rootGetters', () => ({
        entry ({ id, type }) {
          if (id === '1' && type === 'board-lists') return $boardList1
          if (id === '2' && type === 'board-lists') return $boardList2
        }
      }))
      def('boardList1', () => ({ id: '1', type: 'board-lists' }))
      def('boardList2', () => ({ id: '2', type: 'board-lists' }))
      def('boardLists', () => [$boardList1, $boardList2])

      it('transform boardListsRefs to a boardList list', () => {
        expect($subject).to.eql($boardLists)
      })
    })
  })

  describe('.mutations', () => {
    describe('.boardLists', () => {
      subject(() => Board.mutations.boardLists($state, $boardLists))
      def('state', () => ({}))
      def('boardList1', () => ({ id: '1', type: 'board-lists' }))
      def('boardList2', () => ({ id: '2', type: 'board-lists' }))
      def('boardLists', () => [$boardList1, $boardList2])

      it('set boardListRefs', () => {
        $subject
        expect($state.boardListRefs).to.eql([
          { id: '1', type: 'board-lists' },
          { id: '2', type: 'board-lists' }
        ])
      })
    })
  })

  describe('.actions', () => {
    describe('.getBoardLists', () => {
      it('calls commit("boardLists", args)', (done) => {
        const boardList1 = { id: '1', type: 'board-lists' }
        const boardList2 = { id: '2', type: 'board-lists' }

        Board.actions.getBoardLists({
          commit: (method, boardLists) => {
            expect(method).to.eql('boardLists')
            expect(boardLists).to.eql([boardList1, boardList2])
            done()
          },
          dispatch: sinon
            .stub()
            .withArgs('getBoardLists', null, { root: true })
            .returns(Promise.resolve({ data: [boardList1, boardList2] }))
        })
      })
    })
    describe('.sortBoardLists', () => {
      it('calls dispatch("sortBoardLists", args)', (done) => {
        const boardList1 = { id: '1', type: 'board-lists' }
        const boardList2 = { id: '2', type: 'board-lists' }

        Board.actions.sortBoardLists(
          {
            commit: (method, boardLists) => {
              expect(method).to.eql('boardLists')
              expect(boardLists).to.eql([boardList1, boardList2])
              done()
            },
            dispatch: () => {}
          },
          [boardList1, boardList2]
        )
      })
      it('calls commit("boardLists", args)', (done) => {
        const boardList1 = { id: '1', type: 'board-lists' }
        const boardList2 = { id: '2', type: 'board-lists' }

        Board.actions.sortBoardLists(
          {
            commit: () => {},
            dispatch: (method, boardLists) => {
              expect(method).to.eql('sortBoardLists')
              expect(boardLists).to.eql([boardList1, boardList2])
              done()
            }
          },
          [boardList1, boardList2]
        )
      })
    })
  })
})
