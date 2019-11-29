const endpoint = '/api/v1'

export default {
  getContext (context) {
    return context.dispatch('get', { endpoint, resource: 'context' })
  },
  updateUser (context, { entry, selectedProject }) {
    let payload = {
      id: entry.id,
      type: entry.type,
      relationships: {
        'selected-project': { 'data': selectedProject }
      }
    }
    return context.dispatch('update', { entry, payload, endpoint })
  },
  initUsers (context) {
    return context.dispatch('get', {
      endpoint,
      resource: 'users'
    })
  },
  users (context) {
    return this.dispatch('initUsers')
  }
}
