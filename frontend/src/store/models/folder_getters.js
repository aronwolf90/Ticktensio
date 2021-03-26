import { Utils } from 'vuex-jsonapi-client'

export default {
  folders (store, getters) {
    return getters.collection('folders') || []
  },
  rootFolders (store, getters) {
    return getters.folders.filter(folder => {
      return Utils.attribute(folder, 'root')
    })
  },
  projectFolders (store, getters) {
    return projectId => {
      return getters.associatedEntries({
        entry: getters.associatedEntry({
          entry: getters.project(projectId),
          name: 'folder'
        }),
        name: 'folders'
      })
    }
  }
}
