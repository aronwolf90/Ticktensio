export default {
  projects (store, getters) {
    return getters.collection('projects') || []
  },
  project (store, getters) {
    return (id) => getters.entry({
      type: 'projects',
      id: id
    })
  },
  selectedProject (store, getters) {
    const currentUser = getters.currentUser
    return getters.relationship({
      entry: currentUser,
      name: 'selected-project'
    })
  },
  projectStatuses (store, getters) {
    return getters.collection('project-statuses')
  }
}
