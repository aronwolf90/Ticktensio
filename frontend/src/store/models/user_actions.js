const endpoint = '/api/v1'

export default {
  updateContext (context, { entry, attributes }) {
    return context.dispatch('update', {
      endpoint,
      resource: 'context',
      entry: entry,
      payload: { attributes }
    })
  },
  updateUserConfiguration (context, { user, payload }) {
    return context.dispatch('update', {
      resource: `users/${user.id}/configuration`,
      entry: user,
      payload
    })
  },
  createUser (context, payload) {
    return context.dispatch('create', { resource: 'users', payload })
  },
  getUser (context, id) {
    return context.dispatch('get', {
      endpoint,
      resource: `users/${id}`
    })
  },
  updateUser (context, { entry, selectedProject }) {
    const payload = {
      id: entry.id,
      type: entry.type,
      relationships: {
        'selected-project': { data: selectedProject }
      }
    }
    return context.dispatch('update', { entry, payload, endpoint })
  },
  destroyUser (context, user) {
    return context.dispatch('destroy', { entry: user })
  },
  initUsers (context) {
    return context.dispatch('get', {
      endpoint,
      resource: 'users'
    })
  },
  getUsers (context) {
    return context.dispatch('get', {
      endpoint,
      resource: 'users'
    })
  },
  users (context) {
    return this.dispatch('initUsers')
  },
  searchUser (context, search) {
    return context.dispatch('get', {
      endpoint,
      resource: `users?query=${search}`
    })
  }
}
