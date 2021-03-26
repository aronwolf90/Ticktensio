const endpoint = '/api/v1'

export default {
  initWikiPage (context, id) {
    return context.dispatch('get', { endpoint, resource: `wiki_pages/${id}` })
  },
  updateWikiPage (context, { entry, attributes }) {
    const payload = {
      id: entry.id,
      type: entry.type,
      attributes
    }
    return context.dispatch('update', { entry, payload, endpoint })
  }
}
