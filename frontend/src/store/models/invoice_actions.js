export default {
  invoices (context) {
    return context.dispatch('get', {
      resource: 'invoices'
    })
  }
}
