const endpoint = '/api/v1'

export default {
  sortBoardLists (context, boardLists) {
    context.dispatch('request', {
      url: endpoint + '/board_lists/sort',
      method: 'put',
      payload: boardLists.map(entry => entry.id)
    })
  },
  getBoardLists (context) {
    return context.dispatch('initCurrentUser').then(currentUser => {
      let project = currentUser.relationships['selected-project'].data
      let projectId = project ? project.id : null
      return context.dispatch('get', {
        endpoint,
        resource: `board_lists?filter[project_id]=${projectId}&include[]=issues`
      })
    })
  },
  loadBoardLists (context) {
    context.dispatch('initCurrentUser').then(currentUser => {
      let project = currentUser.relationships['selected-project'].data
      let projectId = project ? project.id : null
      return context.dispatch('add', {
        endpoint,
        resource: `board_lists?filter[project_id]=${projectId}`
      })
    })
  },
  updateBoardList (context, { entry, attributes }) {
    let payload = {
      id: entry.id,
      type: entry.type,
      attributes
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
  }
}
