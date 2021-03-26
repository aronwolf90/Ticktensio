import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    form: {
      attributes: {
        name: null
      },
      relationships: {
        folder: {
          data: null
        }
      }
    },
    errors: [],
    folderRef: null
  },
  getters: {
    formName (state) {
      return state.form.attributes.name
    },
    formFolderRef (state) {
      return state.form.relationships.folder.data
    },
    folderId (state) {
      return state.folderId
    },
    folder (state, _getters, _rootState, rootGetters) {
      return rootGetters.entry(state.folderRef)
    }
  },
  mutations: {
    clear (state, comments) {
      state.form = {
        attributes: {
          name: null
        },
        relationships: {
          folder: {
            data: null
          }
        }
      }
    },
    errors (state, errors) {
      state.errors = errors
    },
    formName (state, name) {
      state.form.attributes.name = name
    },
    formFolderRef (state, folderRef) {
      state.form.relationships.folder.data = Utils.entryToRef(folderRef)
    },
    folderId (state, folderId) {
      state.folderId = folderId
    },
    folder (state, folder) {
      state.folderRef = Utils.entryToRef(folder)
    }
  },
  actions: {
    initializeNewForm (context) {
      context.commit('clear')
      return context.dispatch('get', 'folders', { root: true })
    },
    async initializeEditForm (context, folderId) {
      context.commit('clear')
      const folder = (await context.dispatch('get', `folders/${folderId}`,
        { root: true })).data
      context.commit('folder', folder)
      context.commit('folderId', folderId)
      context.commit('formName', Utils.attribute(folder, 'name'))
      context.commit('formFolderRef', Utils.relationship(folder, 'folder'))
    },
    create (context) {
      return context.dispatch('create', {
        resource: 'folders',
        payload: context.state.form
      }, { root: true })
        .then(() => true)
        .catch(({ data }) => {
          context.commit('errors', data.errors)
          return false
        })
    },
    update (context) {
      return context.dispatch('update', {
        entry: context.getters.folder,
        payload: context.state.form
      }, { root: true })
        .then(() => true)
        .catch(({ data }) => {
          context.commit('errors', data.errors)
          return false
        })
    }
  }
}
