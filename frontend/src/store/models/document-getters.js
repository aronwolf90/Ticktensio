export default {
  projectDocuments (store, getters) {
    return projectId => {
      return getters.associatedEntries({
        entry: getters.associatedEntry({
          entry: getters.project(projectId),
          name: 'folder'
        }),
        name: 'documents'
      })
    }
  },
  document (store, getters) {
    return (id) => getters.entry({ type: 'documents', id: id })
  }
}
