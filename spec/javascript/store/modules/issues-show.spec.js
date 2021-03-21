import IssuesShow from '../../../../app/javascript/store/modules/issues-show.js'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Store.Modules.IssuesShow', () => {
  const comment = {
    id: 1,
    type: 'comments',
    attributes: {
      content: 'Content'
    }
  }
  const boardList = {
    id: 1,
    type: 'board-lists',
    attributes: {
      name: 'In progress'
    }
  }
  const project = {
    id: 1,
    type: 'projects',
    attributes: {
      name: 'Test'
    }
  }
  const issue = {
    id: 1,
    type: 'issues',
    attributes: {
      name: 'Test'
    }
  }

  describe('.getters', () => {
    it('.comments', () => {
      const result = IssuesShow.getters.comments({
        commentRefs: [{ id: 1, type: 'comments' }]
      }, {}, {}, {
        comment () { return comment }
      })

      expect(result).to.eql([comment])
    })
    it('.boardLists', () => {
      const entry = sandbox.stub()

      entry.withArgs({ id: 1, type: 'board-lists' }).returns(boardList)
      const result = IssuesShow.getters.boardLists({
        boardListRefs: [{ id: 1, type: 'board-lists' }]
      }, {}, {}, {
        entry
      })

      expect(result).to.eql([boardList])
    })
    it('.projects', () => {
      const entry = sandbox.stub()

      entry.withArgs({ id: 1, type: 'projects' }).returns(project)
      const result = IssuesShow.getters.projects({
        projectRefs: [{ id: 1, type: 'projects' }]
      }, {}, {}, {
        entry
      })

      expect(result).to.eql([project])
    })
  })
  describe('.actions', () => {
    it('.fetch', async () => {
      const dispatch = sandbox.stub()
      const commit = sandbox.stub()

      dispatch.returns(Promise.resolve())
      dispatch.withArgs('getIssueComments', '1').returns(Promise.resolve({ data: [comment] }))
      dispatch.withArgs('getBoardLists').returns(Promise.resolve({ data: [boardList] }))
      await IssuesShow.actions.fetch({
        dispatch,
        commit
      }, '1')

      expect(dispatch).to.have.been
        .calledWith('get', `issues/1?include=board_list,project`, { root: true })
      expect(commit).to.have.been.calledWith('issueId', '1')
      expect(dispatch).to.have.been.calledWith('getIssueComments', '1')
      expect(commit).to.have.been.calledWith('comments', [comment])
      expect(dispatch).to.have.been.calledWith('getLabels')
      expect(dispatch).to.have.been.calledWith('getBoardLists')
      expect(commit).to.have.been.calledWith('boardLists', [boardList])
      expect(dispatch).to.have.been.calledWith('getProjects')
    })
    describe('.createComment', () => {
      IssuesShow.actions.createComment({
        dispatch (method, payload) {
          expect(method).to.eq('createComment')
          return Promise.resolve({ data: { data: comment } })
        },
        getters: {
          comments: [comment]
        },
        commit () {}
      },
      {})
    })
    describe('.getProjects', async () => {
      const dispatch = sandbox.stub()
      const commit = sandbox.stub()
      dispatch.withArgs('get').returns(Promise.resolve({ data: [project] }))
      await IssuesShow.actions.getProjects({ dispatch, commit }, 'Test')
      expect(dispatch).to.have.been.calledWith('get', 'projects?query=Test')
      expect(commit).to.have.been.calledWith('projects', [project])
    })
    describe('.updateProject', () => {
      const dispatch = sandbox.stub()
      dispatch.returns(Promise.resolve())
      IssuesShow.actions.updateProject({ dispatch, getters: { issue } }, project)
      expect(dispatch).to.have.been.calledWith('update', {
        entry: issue,
        payload: {
          relationships: {
            project: {
              data: {
                id: 1,
                type: 'projects'
              }
            }
          }
        }
      })
    })
  })
  describe('.mutations', () => {
    it('.comments', () => {
      let state = {}
      IssuesShow.mutations.comments(state, [comment])
      expect(state).to.eql({
        commentRefs: [ { id: 1, type: 'comments' } ]
      })
    })
    it('.boardLists', () => {
      let state = {}
      IssuesShow.mutations.boardLists(state, [boardList])
      expect(state).to.eql({
        boardListRefs: [ { id: 1, type: 'board-lists' } ]
      })
    })
    it('.project', () => {
      let state = {}
      IssuesShow.mutations.project(state, project)
      expect(state).to.eql({
        projectRef: { id: 1, type: 'projects' }
      })
    })
    it('.projects', () => {
      let state = {}
      IssuesShow.mutations.projects(state, [project])
      expect(state).to.eql({
        projectRefs: [{ id: 1, type: 'projects' }]
      })
    })
  })
})
