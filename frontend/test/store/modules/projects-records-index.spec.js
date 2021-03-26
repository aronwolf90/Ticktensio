import ProjectsRecordsIndexModule from 'store/modules/projects-records-index.js'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('store/modules/projects-records-index.js', () => {
  const projectRecordDay = {
    id: '1',
    type: 'project-record-days',
    attributes: {
      description: 'Test description'
    }
  }

  it('mutations.projectRecordDays', () => {
    const state = { projectRecordDayRefs: null }
    ProjectsRecordsIndexModule.mutations.projectRecordDays(state,
      [{ id: '1', type: 'project-record-days' }])

    expect(state.projectRecordDayRefs).toEqual([{
      id: '1', type: 'project-record-days'
    }])
  })

  it('getters.projectRecordDays', () => {
    const state = {
      projectRecordDayRefs: [{ id: '1', type: 'project-record-days' }]
    }

    when(entry).calledWith({ id: '1', type: 'project-record-days' })
      .mockReturnValue(projectRecordDay)

    expect(ProjectsRecordsIndexModule.getters.projectRecordDays(
      state, null, null, { entry }
    )).toEqual([projectRecordDay])
  })

  it('actions.fetch', async () => {
    const response = {
      data: [projectRecordDay],
      meta: { count: 1 }
    }

    when(dispatch)
      .calledWith('get',
        'project_record_days?include=records&page=1&filter[project_id]=1', { root: true })
      .mockResolvedValue(response)
    await ProjectsRecordsIndexModule.actions.fetch({ dispatch, commit }, { projectId: 1 })

    expect(commit).toHaveBeenCalledWith('projectRecordDays',
      [projectRecordDay])
  })
})
