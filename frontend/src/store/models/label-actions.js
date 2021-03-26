export default {
  getLabels (context) {
    return context.dispatch('get', { resource: 'labels' })
  },
  createLabel (context, payload) {
    return context.dispatch('create', { resource: 'labels', payload })
  }
}
