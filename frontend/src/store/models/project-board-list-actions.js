const endpoint = '/api/v1'

export default {
  getProjectBoardList (context, id) {
    return context.dispatch('get', {
      endpoint,
      resource: `project_board_lists/${id}`
    })
  },
  updateProjectBoardList (context, { projectBoardList, payload }) {
    return context.dispatch('update', {
      entry: projectBoardList,
      payload
    })
  },
  createProjectBoardList (context, projectBoardList) {
    return context.dispatch('create', {
      endpoint,
      resource: 'project_board_lists',
      payload: projectBoardList
    })
  },
  destroyProjectBoardList (context, projectBoardList) {
    return context.dispatch('destroy', {
      entry: projectBoardList
    })
  }
}
