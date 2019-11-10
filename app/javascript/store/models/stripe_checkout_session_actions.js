const endpoint = '/api/v1'
const resource = 'stripe_checkout_sessions'

export default {
  createStripeCheckoutSession (context, startDate) {
    return context.dispatch('create', {
      endpoint,
      resource
    })
  }
}
