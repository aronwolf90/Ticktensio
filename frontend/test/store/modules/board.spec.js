import Board from 'store/modules/board.js'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Modules.Board', () => {
  describe('.getters', () => {
    it('.project', () => {
      const state = {
        projectRef: { id: '1', type: 'projects' }
      }
      const project = {
        id: '1',
        type: 'projects'
      }
      const entry = jest.fn()
      const rootGetters = {
        entry
      }
      when(entry)
        .calledWith({ id: '1', type: 'projects' })
        .mockReturnValue(project)
      expect(Board.getters.project(state, {}, {}, rootGetters))
        .toEqual(project)
    })
  })

  describe('.actions', () => {
    it('.fetch', () => {
      const context = { commit: jest.fn(), dispatch: jest.fn() }
      Board.actions.fetch(context, '1')
      expect(context.commit)
        .toHaveBeenCalledWith('project', { id: '1', type: 'projects' })
      expect(context.dispatch)
        .toHaveBeenCalledWith('getBoardLists', '1')
    })

    it('.refrech', () => {
      const context = {
        dispatch: jest.fn(),
        state: {
          projectRef: {
            id: '1',
            type: 'projects'
          }
        }
      }
      Board.actions.refrech(context)
      expect(context.dispatch)
        .toHaveBeenCalledWith('fetch', '1')
    })

    describe('.getBoardLists', () => {
      it('calls commit("boardLists", args)', async () => {
        const boardList1 = { id: '1', type: 'board-lists' }
        const boardList2 = { id: '2', type: 'board-lists' }
        const context = {
          commit: jest.fn(),
          dispatch: jest.fn()
        }
        when(context.dispatch)
          .calledWith('initCurrentUser')
          .mockResolvedValue()
          .calledWith('getBoardLists', expect.anything(), expect.anything())
          .mockResolvedValue({ data: [boardList1, boardList2] })

        await Board.actions.getBoardLists(context, '1')
        expect(context.commit)
          .toHaveBeenCalledWith('boardLists', [boardList1, boardList2])
      })
    })
    describe('.sortBoardLists', () => {
      it('calls dispatch("sortBoardLists", args)', (done) => {
        const boardList1 = { id: '1', type: 'board-lists' }
        const boardList2 = { id: '2', type: 'board-lists' }

        Board.actions.sortBoardLists(
          {
            commit: (method, boardLists) => {
              expect(method).toEqual('boardLists')
              expect(boardLists).toEqual([boardList1, boardList2])
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
              expect(method).toEqual('sortBoardLists')
              expect(boardLists).toEqual([boardList1, boardList2])
              done()
            }
          },
          [boardList1, boardList2]
        )
      })
    })
    describe('.adjustBoardListIssuesRelationshipLinks', () => {
      it('when next link is not present do not set it', (done) => {
        const issues = [{ id: 1, type: 'issues' }]
        const boardList = {
          id: 1,
          type: 'board-lists',
          relationships: {
            issues: {
              data: issues,
              links: {
                next: null,
                self: '/api/v1/board_lists/1'
              }
            }
          }
        }
        Board.actions.adjustBoardListIssuesRelationshipLinks({
          commit: (action, payload) => {
            expect(action).toEqual('relataionshipLinks')
            expect(payload).toEqual({
              entry: boardList,
              association: 'issues',
              links: {
                next: null,
                self: '/api/v1/board_lists/1'
              }
            })
            done()
          }
        }, {
          boardList,
          issues
        })
      })
    })
    describe('.adjustBoardListIssuesRelationshipLinks', () => {
      it('when next link is present, set it', (done) => {
        const issues = [{ id: 1, type: 'issues' }, { id: 2, type: 'issues' }]
        const boardList = {
          id: 1,
          type: 'board-lists',
          relationships: {
            issues: {
              data: issues,
              links: {
                next: '/api/v1/board_lists/1/issues?more_id=1',
                self: '/api/v1/board_lists/1'
              }
            }
          }
        }
        Board.actions.adjustBoardListIssuesRelationshipLinks({
          commit: (action, payload) => {
            expect(action).toEqual('relataionshipLinks')
            expect(payload).toEqual({
              entry: boardList,
              association: 'issues',
              links: {
                next: '/api/v1/board_lists/1/issues?more_id=2',
                self: '/api/v1/board_lists/1'
              }
            })
            done()
          }
        }, {
          boardList,
          issues
        })
      })
    })
    describe('.updateBoardListIssuesOnServer', () => {
      const issue1 = { id: 1, type: 'issues', links: { self: '/api/v1/issues/1' } }
      const issue2 = { id: 2, type: 'issues', links: { self: '/api/v1/issues/2' } }
      const issue3 = { id: 3, type: 'issues', links: { self: '/api/v1/issues/3' } }

      it('do not call updateIssue when a issue is removed', () => {
        const context = {
          rootGetters: {
            associatedEntries: () => [issue1, issue2, issue3]
          },
          dispatch: () => {
            throw new EvalError()
          }
        }

        Board.actions.updateBoardListIssuesOnServer(context, {
          issues: [issue1, issue2]
        })
      })

      it('call updateIssue when a issue is added', () => {
        const context = {
          rootGetters: {
            associatedEntries: () => [issue1, issue2, issue3],
            axios: {
              post: jest.fn()
            }
          }
        }
        const issue4 = { id: 4, type: 'issues', links: { self: '/api/v1/issues/4' } }

        Board.actions.updateBoardListIssuesOnServer(context, {
          issues: [issue1, issue2, issue3, issue4],
          boardList: { id: '1', type: 'board-lists' }
        })
        expect(context.rootGetters.axios.post)
          .toHaveBeenCalledWith('/api/v1/issues/4/move', {
            issue_id: 4,
            before_issue_id: 3,
            board_list_id: '1'
          })
      })

      it('call updateIssue when a issue is sorted', () => {
        const context = {
          rootGetters: {
            associatedEntries: () => [issue1, issue2, issue3],
            axios: {
              post: jest.fn()
            }
          }
        }

        Board.actions.updateBoardListIssuesOnServer(context, {
          issues: [issue3, issue2, issue1],
          boardList: { id: '1', type: 'board-lists' }
        })
        expect(context.rootGetters.axios.post)
          .toHaveBeenCalledWith('/api/v1/issues/1/move', {
            issue_id: 1,
            before_issue_id: 2,
            board_list_id: '1'
          })
      })
    })
  })
})
