export default {
  projectComment (state, getters) {
    return (id) => getters.entry({
      type: 'project-comments',
      id: id
    })
  }
}
