import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    projectCommentRefs: [],
    projectId: null,
    reminderRefs: [],
    contactRefs: [],
    contact: {
      id: {
        value: null,
        editMode: false
      },
      name: {
        value: '',
        editMode: false
      },
      telephoneNumber: {
        value: '',
        editMode: false
      },
      email: {
        value: '',
        editMode: false
      }
    },
    formLoaded: false,
    form: {
      attributes: {
        name: null,
        description: null
      }
    }
  },
  getters: {
    comments (state, _getters, rootState, rootGetters) {
      return state.projectCommentRefs.map(ref => {
        return rootGetters.projectComment(ref.id)
      })
    },
    project (state, _getters, rootState, rootGetters) {
      return rootGetters.project(state.projectId)
    },
    contacts (state, _getters, rootState, rootGetters) {
      return state.contactRefs.map(ref => {
        return rootGetters.entry(ref)
      })
    },
    currentUser (state, _getters, rootState, rootGetters) {
      return rootGetters.currentUser
    },
    contact (state, getters, _rootState, rootGetters) {
      return rootGetters.associatedEntry({
        entry: getters.project,
        name: 'contact'
      })
    },
    contactNameValue (state) {
      return state.contact.name.value
    },
    contactNameEditMode (state) {
      return state.contact.name.editMode
    },
    contactTelephoneNumberValue (state) {
      return state.contact.telephoneNumber.value
    },
    contactTelephoneNumberEditMode (state) {
      return state.contact.telephoneNumber.editMode
    },
    contactEmailValue (state) {
      return state.contact.email.value
    },
    contactEmailEditMode (state) {
      return state.contact.email.editMode
    },
    reminders (state) {
      return state.reminderRefs
    },
    formName (state) {
      return state.form.attributes.name
    },
    formDescription (state) {
      return state.form.attributes.description
    },
    contactIdEditMode (state) {
      return state.contact.id.editMode
    },
    contactIdValue (state) {
      return state.contact.id.value
    },
    formLoaded (state) {
      return state.formLoaded
    }
  },
  mutations: {
    comments (state, comments) {
      state.projectCommentRefs = Utils.entryArrayToRef(comments)
    },
    reminders (state, reminders) {
      state.reminderRefs = Utils.entryArrayToRef(reminders)
    },
    contacts (state, contacts) {
      state.contactRefs = Utils.entryArrayToRef(contacts)
    },
    addReminder (state, reminder) {
      state.reminderRefs.push(Utils.entryToRef(reminder))
    },
    projectId (state, projectId) {
      state.projectId = projectId
    },
    contactNameValue (state, value) {
      state.contact.name.value = value
    },
    contactNameEditMode (state, value) {
      state.contact.name.editMode = value
    },
    contactTelephoneNumberValue (state, value) {
      state.contact.telephoneNumber.value = value
    },
    contactTelephoneNumberEditMode (state, value) {
      state.contact.telephoneNumber.editMode = value
    },
    contactEmailValue (state, value) {
      state.contact.email.value = value
    },
    contactEmailEditMode (state, value) {
      state.contact.email.editMode = value
    },
    formName (state, value) {
      state.form.attributes.name = value
    },
    formDescription (state, value) {
      state.form.attributes.description = value
    },
    removeReminder (state, issue) {
      const index = state.reminderRefs.findIndex(entry => {
        return Utils.sameRef(entry, issue)
      })
      state.reminderRefs.splice(index, 1)
    },
    contactIdEditMode (state, editMode) {
      state.contact.id.editMode = editMode
    },
    contactIdValue (state, value) {
      state.contact.id.value = value
    },
    formLoaded (state, value) {
      state.formLoaded = value
    }
  },
  actions: {
    fetch (context, id) {
      context.commit('projectId', id)
      context.dispatch('getProject', id, { root: true }).then(response => {
        context.commit(
          'formName',
          Utils.attribute(response.data, 'name')
        )
        context.commit(
          'formDescription',
          Utils.attribute(response.data, 'description')
        )
        context.commit('formLoaded', true)
        context.dispatch('setContact', response)
      })
      context.dispatch('getProjectComments', id, { root: true }).then(result => {
        context.commit('comments', result.data)
      })
      context.dispatch(
        'getProjectReminders', id, { root: true }
      ).then(result => {
        context.commit('reminders', result.data)
      })
      context.dispatch('getContacts', null, { root: true }).then(result => {
        context.commit('contacts', result.data)
      })
      context.dispatch('getProjectStatuses', null, { root: true })
    },
    setContact (context) {
      context.commit(
        'contactIdValue',
        Utils.entryToRef(context.getters.contact)
      )
      context.commit(
        'contactNameValue',
        Utils.attribute(context.getters.contact, 'name')
      )
      context.commit(
        'contactTelephoneNumberValue',
        Utils.attribute(context.getters.contact, 'telephone')
      )
      context.commit(
        'contactEmailValue',
        Utils.attribute(context.getters.contact, 'email')
      )
    },
    createComment (context, payload) {
      payload.relationships = {
        project: {
          data: context.getters.project
        },
        user: {
          data: context.getters.currentUser
        }
      }

      return context.dispatch(
        'createProjectComment',
        payload,
        { root: true }
      ).then(response => {
        context.commit('comments', context.getters.comments.concat(response.data.data))
      })
    },
    closeIssue (context, issue) {
      context.dispatch('closeIssue', issue, { root: true })
      context.commit('removeReminder', issue)
    },
    updateProject (context) {
      return context.dispatch('update', {
        entry: context.getters.project,
        payload: context.state.form
      },
      {
        root: true
      })
    },
    updateContactAttributes (context, attributes) {
      return context.dispatch('update', {
        entry: context.getters.project,
        payload: {
          relationships: {
            contact: {
              data: {
                attributes
              }
            }
          }
        }
      },
      {
        root: true
      }).then(response => {
        context.commit('contactIdValue', response.data.data.relationships.contact.data.id)
      })
    },
    changeContact (context) {
      return context.dispatch('update', {
        entry: context.getters.project,
        payload: {
          relationships: {
            contact: {
              data: Utils.entryToRef(context.getters.contactIdValue)
            }
          }
        }
      },
      {
        root: true
      }).then(() => {
        context.dispatch('setContact')
        context.commit('contactIdEditMode', false)
      })
    },
    changeProjectStatus (context, projectStatus) {
      return context.dispatch('update', {
        entry: context.getters.project,
        payload: {
          relationships: {
            'project-status': {
              data: projectStatus
            }
          }
        }
      },
      {
        root: true
      })
    },
    async searchForContact (context, value) {
      const result = await context.dispatch(
        'searchContacts',
        value,
        { root: true }
      )
      context.commit('contacts', result.data)
    }
  }
}
