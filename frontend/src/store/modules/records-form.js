import { Utils } from 'vuex-jsonapi-client'

export default {
  namespaced: true,
  state: {
    recordRef: null,
    form: {
      attributes: {
        'start-time': null,
        'end-time': null
      },
      relationships: {
        issue: {
          data: null
        }
      }
    },
    errors: []
  },
  getters: {
    formIssueRef (state) {
      return state.form.relationships.issue.data
    },
    formStartTime (state) {
      return state.form.attributes['start-time']
    },
    formEndTime (state) {
      return state.form.attributes['end-time']
    },
    errors (state) {
      return state.errors
    },
    record (state, _getters, _rootState, rootGetters) {
      return rootGetters.entry(state.recordRef)
    }
  },
  mutations: {
    clear (state, comments) {
      state.form = {
        attributes: {
          'start-time': null,
          'end-time': null
        },
        relationships: {
          issue: {
            data: null
          }
        }
      }
    },
    formStartTime (state, startTime) {
      state.form.attributes['start-time'] = startTime
    },
    formEndTime (state, startTime) {
      state.form.attributes['end-time'] = startTime
    },
    formIssueRef (state, issueRef) {
      state.form.relationships.issue.data = issueRef
    },
    errors (state, errors) {
      state.errors = errors
    },
    record (state, record) {
      state.recordRef = Utils.entryToRef(record)
    }
  },
  actions: {
    initializeNewForm (context) {
      context.commit('clear')
      return context.dispatch('get', 'issues', { root: true })
    },
    initializeEditForm (context, recordId) {
      context.commit('clear')
      context.dispatch('get', 'issues', { root: true })
      return context.dispatch('get', `records/${recordId}`, { root: true }).then(response => {
        context.commit('formIssueRef', Utils.relationship(response.data, 'issue'))
        context.commit('formStartTime', Utils.attribute(response.data, 'start-time'))
        context.commit('formEndTime', Utils.attribute(response.data, 'end-time'))
        context.commit('record', response.data)
      })
    },
    create (context) {
      return context.dispatch('create', {
        resource: 'records',
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
        entry: context.getters.record,
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
