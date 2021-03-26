const endpoint = '/api/v1'

export default {
  getContacts (context) {
    return context.dispatch('get', {
      endpoint: endpoint,
      resource: 'contacts'
    })
  },
  contact (context, id) {
    return context.dispatch('get', {
      endpoint: endpoint,
      resource: `contacts/${id}?include[]=contact_avatar`
    })
  },
  searchContacts (context, query) {
    return context.dispatch('get', {
      endpoint: endpoint,
      resource: `contacts?query=${query}`
    })
  },
  createContact (context, payload) {
    return context.dispatch('create', {
      payload: payload,
      endpoint: endpoint,
      resource: 'contacts'
    })
  },
  updateContact (context, { entry, payload }) {
    return context.dispatch('update', {
      payload: payload,
      entry: entry
    })
  },
  destroyContact (context, entry) {
    return context.dispatch('destroy', {
      entry: entry
    })
  }
}
