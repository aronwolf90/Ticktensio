const endpoint = '/api/v1'

export default {
  getIssueComments (context, id) {
    return context.dispatch('get', {
      endpoint,
      resource: `/issues/${id}/comments`
    })
  },
  createComment (context, payload) {
    return context.dispatch('create', {
      resource: 'comments',
      endpoint,
      payload
    })
  }
}
