const endpoint = '/api/v1'

export default {
  sortBoardLists (context, boardLists) {
    context.dispatch('request', {
      url: endpoint + '/board_lists/sort',
      method: 'put',
      payload: boardLists.map(entry => entry.id)
    })
  },
  getBoardList (context, id) {
    return context.dispatch('get', {
      endpoint,
      resource: `board_lists/${id}`
    })
  },
  getBoardLists (context, projectId) {
    return context.dispatch('initCurrentUser').then(() => {
      if (!projectId) {
        const currentUser = context.getters.currentUser
        const project = currentUser.relationships['selected-project'].data
        projectId = project ? project.id : null
      }
      let resource = null
      if (projectId) {
        resource = `board_lists?filter[project_id]=${projectId}&include=issues,issues.labels,issues.user`
      } else {
        resource = 'board_lists?&include=issues,issues.labels'
      }
      return context.dispatch('get', {
        endpoint,
        resource
      })
    })
  },
  createBoardList (context, payload) {
    return context.dispatch('create', {
      payload,
      endpoint,
      resource: '/board_lists'
    })
  },
  updateBoardList (context, { entry, attributes, relationships }) {
    const payload = {
      id: entry.id,
      type: entry.type,
      attributes,
      relationships
    }
    return context.dispatch('update', { entry, payload, endpoint })
  },
  updateBoardListIssues (context, { boardList, issues }) {
    context.dispatch('changeManyToOneReference', {
      children: issues,
      parent: boardList,
      childRelationshipName: 'board-list',
      parentRelationshipName: 'issues',
      endpoint,
      parentTypes: ['board-lists']
    })
  },
  destroyBoardList (context, entry) {
    return context.dispatch('destroy', { entry })
  }
}
