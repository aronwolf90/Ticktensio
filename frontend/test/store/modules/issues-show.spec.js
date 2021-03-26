import IssuesShow from 'store/modules/issues-show.js'

describe('store/modules/issues-show.js', () => {
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

      expect(result).toEqual([comment])
    })

    it('.boardLists', () => {
      const entry = jest.fn()

      when(entry)
        .calledWith({ id: 1, type: 'board-lists' })
        .mockReturnValue(boardList)
      const result = IssuesShow.getters.boardLists({
        boardListRefs: [{ id: 1, type: 'board-lists' }]
      }, {}, {}, {
        entry
      })

      expect(result).toEqual([boardList])
    })
    it('.projects', () => {
      const entry = jest.fn()

      when(entry)
        .calledWith({ id: 1, type: 'projects' })
        .mockReturnValue(project)
      const result = IssuesShow.getters.projects({
        projectRefs: [{ id: 1, type: 'projects' }]
      }, {}, {}, {
        entry
      })

      expect(result).toEqual([project])
    })
  })

  describe('.actions', () => {
    it('.fetch', async () => {
      const dispatch = jest.fn()
      const commit = jest.fn()

      when(dispatch)
        .mockResolvedValue()
        .calledWith('getIssueComments', '1', { root: true })
        .mockResolvedValue({ data: [comment] })
        .calledWith('getBoardLists', null, { root: true })
        .mockResolvedValue({ data: [boardList] })

      await IssuesShow.actions.fetch({
        dispatch,
        commit
      }, '1')

      expect(dispatch).toHaveBeenCalledWith(
        'get', 'issues/1?include=board_list,project', { root: true })
      expect(commit).toHaveBeenCalledWith('issueId', '1')
      expect(dispatch).toHaveBeenCalledWith('getIssueComments', '1',
        { root: true })
      expect(commit).toHaveBeenCalledWith('comments', [comment])
      expect(dispatch).toHaveBeenCalledWith('getLabels', null,
        { root: true })
      expect(dispatch).toHaveBeenCalledWith('getBoardLists', null,
        { root: true })
      expect(commit).toHaveBeenCalledWith('boardLists', [boardList])
      expect(dispatch).toHaveBeenCalledWith('getProjects')
    })
  })

  describe('.createComment', () => {
    IssuesShow.actions.createComment({
      dispatch (method, payload) {
        expect(method).toEqual('createComment')
        return Promise.resolve({ data: { data: comment } })
      },
      getters: {
        comments: [comment]
      },
      commit () {}
    },
    {})
  })

  it('.getProjects', async () => {
    when(dispatch)
      .calledWith('get', expect.anything(), expect.anything())
      .mockResolvedValue({ data: [project] })
    await IssuesShow.actions.getProjects({ dispatch, commit }, 'Test')
    expect(dispatch).toHaveBeenCalledWith('get',
      'projects?query=Test', { root: true })
    expect(commit).toHaveBeenCalledWith('projects', [project])
  })

  it('.updateProject', () => {
    dispatch.mockResolvedValue()
    IssuesShow.actions.updateProject({ dispatch, getters: { issue } }, project)
    expect(dispatch).toHaveBeenCalledWith('update', {
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
    },
    { root: true }
    )
  })
  // describe('.mutations', () => {
  //   it('.comments', () => {
  //     let state = {}
  //     IssuesShow.mutations.comments(state, [comment])
  //     expect(state).toEqual({
  //       commentRefs: [ { id: 1, type: 'comments' } ]
  //     })
  //   })
  //   it('.boardLists', () => {
  //     let state = {}
  //     IssuesShow.mutations.boardLists(state, [boardList])
  //     expect(state).toEqual({
  //       boardListRefs: [ { id: 1, type: 'board-lists' } ]
  //     })
  //   })
  //   it('.project', () => {
  //     let state = {}
  //     IssuesShow.mutations.project(state, project)
  //     expect(state).toEqual({
  //       projectRef: { id: 1, type: 'projects' }
  //     })
  //   })
  //   it('.projects', () => {
  //     let state = {}
  //     IssuesShow.mutations.projects(state, [project])
  //     expect(state).toEqual({
  //       projectRefs: [{ id: 1, type: 'projects' }]
  //     })
  //   })
  // })
})
