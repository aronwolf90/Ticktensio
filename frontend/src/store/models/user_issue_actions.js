const endpoint = '/api/v1'

export default {
  initUserIssuesForCurrentUser (context) {
    return context.dispatch('initCurrentUser').then(response => {
      return context.dispatch('get', {
        endpoint,
        resource: `user_issues?filter[user_id]=${response.data.id}`
      })
    })
  },
  initUserIssueForCurrentUser (context, issueId) {
    return context.dispatch('initCurrentUser').then(response => {
      return context.dispatch('get', {
        endpoint,
        resource: `user_issues/${response.data.id},${issueId}`
      })
    })
  }
}
