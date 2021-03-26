export default {
  context (state, getters) {
    return getters.entry({ type: 'contexts', id: 'context' })
  }
}
