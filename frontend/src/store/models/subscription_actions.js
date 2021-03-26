export default {
  subscription (context) {
    return context.dispatch('get', {
      resource: 'subscription'
    })
  }
}
