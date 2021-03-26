export default {
  boardList (store, getters) {
    return (id) => getters.entry({
      type: 'board-lists',
      id: id
    })
  },
  boardLists (store, getters) {
    return getters.collection('board-lists') || []
  }
}
