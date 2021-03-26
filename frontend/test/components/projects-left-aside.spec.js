import ProjectsLeftAside from 'components/projects-left-aside'

describe('components/projects-left-aside.vue', () => {
  const projectStatus1 = {
    id: 1,
    type: 'project-statuses',
    attributes: {
      name: 'New',
      initial: true
    }
  }

  it('show spinner when the promise is not resolved', async () => {
    const wrapper = createWrapper(ProjectsLeftAside, {
      mocks: {
        $store: {
          getters: {
            'projectsLeftAside/projectStatuses': [projectStatus1]
          },
          dispatch
        }
      }
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('New')
  })
})
