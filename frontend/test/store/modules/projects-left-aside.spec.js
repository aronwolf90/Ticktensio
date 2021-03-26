import ProjectsLeftAsideModule from 'store/modules/projects-left-aside.js'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('store/modules/projects-left-aside.js', () => {
  it('actions.fetch', async () => {
    const projectStatus = { id: '1', type: 'project-statuses' }
    const response = { data: [projectStatus] }

    when(dispatch).calledWith('getProjectStatuses', null, { root: true })
      .mockResolvedValue(response)
    await ProjectsLeftAsideModule.actions.fetch({ dispatch, commit })

    expect(commit).toHaveBeenCalledWith('projectStatuses', [projectStatus])
  })

  it('mutations.projectStatuses', () => {
    const state = {}
    const projectStatus = { id: '1', type: 'project-statuses' }

    ProjectsLeftAsideModule.mutations
      .projectStatuses(state, [projectStatus])

    expect(state).toEqual({ projectStatusesRefs: [{ id: '1', type: 'project-statuses' }] })
  })

  it('getters.projectStatuses', () => {
    const state = { projectStatusesRefs: [{ id: '1', type: 'project-statuses' }] }
    const projectStatus = { id: '1', type: 'project-statuses' }

    when(entry).calledWith({ id: '1', type: 'project-statuses' })
      .mockReturnValue(projectStatus)

    expect(ProjectsLeftAsideModule.getters.projectStatuses(
      state, null, null, { entry }
    )).toEqual([projectStatus])
  })
})
