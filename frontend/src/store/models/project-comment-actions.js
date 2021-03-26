const endpoint = '/api/v1'

export default {
  getProjectComments (context, projectId) {
    return context.dispatch('get', {
      endpoint,
      resource: `projects/${projectId}/project_comments`
    })
  },
  createProjectComment (context, payload) {
    return context.dispatch('create', {
      endpoint,
      resource: 'project_comments',
      payload
    })
  }
}
