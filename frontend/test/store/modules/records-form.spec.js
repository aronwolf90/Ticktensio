import RecordsForm from 'store/modules/records-form.js'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('store/modules/records-form.js', () => {
  it('mutations.clear', () => {
    const state = {}
    RecordsForm.mutations.clear(state)

    expect(state).toEqual({
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
      }
    })
  })

  it('mutations.formStartTime', () => {
    const state = { form: { attributes: { 'start-time': null } } }
    RecordsForm.mutations.formStartTime(state, '10.10.2020 10:10')

    expect(state.form.attributes['start-time']).toEqual('10.10.2020 10:10')
  })

  it('mutations.formEndTime', () => {
    const state = { form: { attributes: { 'end-time': null } } }
    RecordsForm.mutations.formEndTime(state, '10.10.2020 10:10')

    expect(state.form.attributes['end-time']).toEqual('10.10.2020 10:10')
  })

  it('mutations.formIssueRef', () => {
    const state = { form: { relationships: { issue: { data: null } } } }
    RecordsForm.mutations.formIssueRef(state, { id: '1', type: 'issues' })

    expect(state.form.relationships.issue.data).toEqual({ id: '1', type: 'issues' })
  })

  it('actions.initializeNewForm', async () => {
    await RecordsForm.actions.initializeNewForm({ dispatch, commit })

    expect(commit).toHaveBeenCalledWith('clear')
    expect(dispatch).toHaveBeenCalledWith('get', 'issues', { root: true })
  })

  it('getters.formIssueRef', async () => {
    const state = { form: { relationships: { issue: { data: { id: '1', type: 'issues' } } } } }
    expect(RecordsForm.getters.formIssueRef(state)).toEqual({ id: '1', type: 'issues' })
  })

  it('getters.formStartTime', async () => {
    const state = { form: { attributes: { 'start-time': '10.10.2020 10:10' } } }
    expect(RecordsForm.getters.formStartTime(state)).toEqual('10.10.2020 10:10')
  })

  it('getters.formEndTime', async () => {
    const state = { form: { attributes: { 'end-time': '10.10.2020 10:10' } } }
    expect(RecordsForm.getters.formEndTime(state)).toEqual('10.10.2020 10:10')
  })

  it('actions.create returns true when dispatch.create succeed', async () => {
    const state = { form: { attributes: { 'start-time': '10.10.2020 10:10' } } }

    dispatch.mockResolvedValue()
    expect(await RecordsForm.actions.create({ dispatch, state })).toEqual(true)

    expect(dispatch).toHaveBeenCalledWith('create', {
      resource: 'records',
      payload: state.form
    }, { root: true })
  })
})
