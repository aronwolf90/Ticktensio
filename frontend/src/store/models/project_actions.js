const endpoint = '/api/v1'

export default {
  initProjects (context) {
    return context.dispatch('get', {
      endpoint,
      resource: 'projects'
    })
  },
  getProjects (context, page) {
    page = page || 1
    return context.dispatch('get', {
      endpoint,
      resource: `projects?page=${page}`
    })
  },
  getProject (context, id) {
    return context.dispatch('get', {
      endpoint,
      resource: `projects/${id}?include=contact`
    })
  },
  getSelectedProject (context) {
    return context.dispatch('initCurrentUser').then(() => {
      const currentUser = context.getters.currentUser
      const project = currentUser.relationships['selected-project'].data
      if (!project) return Promise.resolve({ data: null })
      if (context.getters.project(project.id)) {
        return Promise.resolve({ data: context.getters.project(project.id) })
      }
      return context.dispatch('getProject', project.id)
    })
  },
  createProject (context, payload) {
    return context.dispatch('create', { resource: 'projects', payload })
  },
  updateProject (context, { project, payload }) {
    return context.dispatch('update', { entry: project, payload })
  },
  destroyProject (context, project) {
    return context.dispatch('destroy', { entry: project })
  },
  getProjectReminders (context, id) {
    return context.dispatch('get', {
      endpoint,
      resource: `projects/${id}/reminders`
    })
  },
  searchProject (context, search) {
    return context.dispatch('get', {
      endpoint,
      resource: `projects?query=${search}`
    })
  }
}
