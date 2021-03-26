export default {
  projectStatus (state, getters) {
    return (id) => getters.entry({
      type: 'project-statuses',
      id: id
    })
  }
}
