const endpoint = '/api/v1'

export default {
  initIssue (context, issueId) {
    return context.dispatch('get', {
      endpoint,
      resource: `issues/${issueId}?include[]=comments`
    })
  },
  getIssue (context, issueId) {
    return context.dispatch('get', {
      endpoint,
      resource: `issues/${issueId}?include[]=comments`
    })
  },
  initIssues (context) {
    return context.dispatch('get', {
      endpoint,
      resource: 'issues'
    })
  },
  initCurrentIssue () {

  },
  createIssue (context, payload) {
    return context.dispatch('create', { resource: 'issues', payload })
  },
  updateIssue (context, { entry, attributes, boardList }) {
    const payload = {
      id: entry.id,
      type: entry.type,
      attributes
    }

    if (boardList) {
      payload.relationships = { 'board-list': { data: boardList } }
    }
    return context.dispatch('update', { entry, payload, endpoint })
  },
  changeIssueToUserReference (context, { issue, user }) {
    context.dispatch('changeOneToManyReference', {
      child: issue,
      parent: user,
      childRelationshipName: 'user',
      parentRelationshipName: 'issues'
    })
  },
  closeIssue (context, issue) {
    return context.dispatch('create', {
      endpoint,
      resource: `/issues/${issue.id}/close`
    })
  },
  searchIssue (context, searchText) {
    return context.dispatch(
      'get', `/api/v1/issues?query=${searchText}&sort[created_at]=desc`
    )
  }
}
