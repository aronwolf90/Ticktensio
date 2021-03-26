export default {
  updateRecord (context, { entry, payload }) {
    context.dispatch('update', { entry, payload, endpoint: '/api/v1' })
    if (payload.attributes['end-time'] &&
      context.getters.currentRecord.id === entry.id) {
      context.commit('setAssociation', {
        parent: null,
        child: context.getters.currentUser,
        relationshipName: 'current-record'
      })
    }
  },
  createRecord (context, { attributes, user, issue }) {
    context.dispatch('create', {
      resource: 'records',
      endpoint: '/api/v1',
      payload: {
        attributes,
        relationships: {
          user: { data: user },
          issue: { data: issue }
        }
      }
    }).then(response => {
      context.commit('setAssociation', {
        parent: response.data.data,
        child: user,
        relationshipName: 'current-record'
      })
    })
  }
}
