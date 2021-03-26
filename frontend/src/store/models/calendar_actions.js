export default {
  destroyCalendarsGoogleIntegration (context) {
    return context.dispatch('destroy', 'calendars/google_integration')
  }
}
