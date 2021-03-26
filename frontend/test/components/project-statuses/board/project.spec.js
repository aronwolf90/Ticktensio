import Project from 'components/project-statuses/board/project'

describe('project-statuses/board/project', () => {
  const user = {
    attributes: {
      firstname: 'Firstname',
      lastname: 'Lastname'
    }
  }
  const project = {
    id: '1',
    type: 'projects',
    attributes: {
      name: 'Name'
    },
    relationships: {
      'main-responsable': {
        id: 1,
        type: 'users'
      }
    }
  }

  it('render project name', async () => {
    const stubedProject = jest.fn()
    const stubedRelationship = jest.fn()
    when(stubedProject)
      .calledWith('1')
      .mockReturnValue(project)
    when(stubedRelationship)
      .calledWith({ id: 1, type: 'users' })
      .mockReturnValue(user)
    const wrapper = createWrapper(Project, {
      propsData: {
        projectId: '1'
      },
      mocks: {
        $store: {
          getters: {
            project: stubedProject,
            relationship: stubedRelationship
          }
        }
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('Name')
  })
})
