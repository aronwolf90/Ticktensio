const endpoint = '/api/v1'

export default {
  getContext (context) {
    if (context.getters.context) {
      return Promise.resolve({ data: context.getters.context })
    }
    return context.dispatch('get', { endpoint, resource: 'context' })
  }
}
