export default {
  issue (state, getters) {
    return (issueId) => getters.entry({
      type: 'issues',
      id: issueId
    })
  }
}
