const endpoint = '/api/v1'

export default {
  getNotifications (context, id) {
    return context.dispatch('get', {
      endpoint,
      resource: '/notifications'
    })
  },
  loadMoreNotifications (context, url) {
    return context.dispatch('get', {
      url: url
    })
  },
  notificationsReaded (context, { readedAt }) {
    return context.dispatch('request', {
      payload: { attributes: { 'readed-at': readedAt } },
      method: 'post',
      url: '/api/v1/notifications_readed'
    })
  }
}
