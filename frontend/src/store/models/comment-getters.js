export default {
  comment (store, getters) {
    return (id) => getters.entry({ id: id, type: 'comments' })
  }
}
