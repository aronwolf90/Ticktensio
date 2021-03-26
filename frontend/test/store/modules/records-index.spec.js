import RecordsIndexModule from 'store/modules/records-index.js'

describe('store/modules/records-index.js', () => {
  const recordDay = {
    id: '1',
    type: 'record-days',
    attributes: {
      description: 'Test description'
    }
  }

  it('mutations.recordDays', () => {
    const state = { recordDayRefs: null }
    RecordsIndexModule.mutations.recordDays(state,
      [{ id: '1', type: 'record-days' }])

    expect(state.recordDayRefs).toEqual([{ id: '1', type: 'record-days' }])
  })

  it('getters.recordDays', () => {
    const state = { recordDayRefs: [{ id: '1', type: 'record-days' }] }

    when(entry)
      .calledWith({ id: '1', type: 'record-days' })
      .mockReturnValue(recordDay)

    expect(RecordsIndexModule.getters.recordDays(
      state, null, null, { entry }
    )).toEqual([recordDay])
  })

  it('getters.monthSpentTime', () => {
    const context = {
      id: '1',
      type: 'contacts',
      attributes: {
        'month-spent-time': 100
      }
    }

    expect(RecordsIndexModule.getters.monthSpentTime(
      {}, null, null, { context }
    )).toEqual(100)
  })

  it('actions.fetch', async () => {
    const response = {
      data: [recordDay],
      meta: { count: 1 }
    }

    when(dispatch)
      .calledWith('getCurrentUser', null, { root: true })
      .mockResolvedValue({ id: '1', type: 'users' })
      .calledWith('get',
        'record_days?include=records&page=1&filter[user_id]=1',
        { root: true })
      .mockResolvedValue(response)
    await RecordsIndexModule.actions.fetch({ dispatch, commit }, {})

    expect(commit).toHaveBeenCalledWith('recordDays', [recordDay])
  })
})
