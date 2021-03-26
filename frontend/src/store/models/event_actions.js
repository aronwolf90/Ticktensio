const endpoint = '/api/v1'

export default {
  initEvents (context) {
    return context.dispatch('get', { endpoint, resource: 'events' })
  },
  createEvent (context, { attributes }) {
    const payload = { attributes }

    return context.dispatch('create', {
      payload,
      endpoint,
      resource: '/events'
    })
  },
  updateEvent (context, { entry, attributes }) {
    const payload = {
      id: entry.id,
      type: entry.type,
      attributes
    }
    return context.dispatch('update', { entry, payload, endpoint })
  },
  destroyEvent (context, entry) {
    return context.dispatch('destroy', { entry })
  }
}
