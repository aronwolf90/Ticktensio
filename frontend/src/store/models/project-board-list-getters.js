export default {
  projectBoardList (store, getters) {
    return (id) => getters.entry({ type: 'project-board-lists', id })
  }
}
