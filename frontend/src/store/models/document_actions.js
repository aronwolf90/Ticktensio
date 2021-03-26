export default {
  getDocument (context, id) {
    return context.dispatch('get', {
      resource: `documents/${id}`
    })
  },
  createDocument (context, payload) {
    return context.dispatch('create', {
      payload,
      resource: 'documents'
    })
  },
  updateDocument (context, { entry, payload }) {
    return context.dispatch('update', {
      entry,
      payload
    })
  }
}
