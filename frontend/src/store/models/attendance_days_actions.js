const endpoint = '/api/v1'
const resource = 'attendance_days'

export default {
  attendanceDays (context, startDate) {
    const path = startDate ? `${resource}?page[number]=${startDate}` : resource

    return context.dispatch('get', {
      endpoint,
      resource: path
    })
  }
}
