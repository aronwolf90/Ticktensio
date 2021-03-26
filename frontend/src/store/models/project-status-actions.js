const endpoint = '/api/v1'

export default {
  getProjectStatuses (context) {
    return context.dispatch('get', { endpoint, resource: 'project_statuses' })
  },
  getProjectStatus (context, id) {
    return context.dispatch('get', {
      endpoint,
      resource: `project_statuses/${id}?include=projects,project_board_lists,project_board_lists.main_responsable`
    })
  },
  createProjectStatus (context, payload) {
    return context.dispatch('create', {
      endpoint,
      resource: 'project_statuses',
      payload
    })
  },
  updateProjectStatus (context, { projectStatus, payload }) {
    return context.dispatch('update', {
      entry: projectStatus,
      payload
    })
  },
  destroyProjectStatus (context, entry) {
    return context.dispatch('destroy', { entry })
  }
}
