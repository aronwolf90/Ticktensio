import Index from 'pages/project-statuses/_id'

describe('project-statuses/show.vue', () => {
  const project = {
    id: 1,
    type: 'projects',
    attributes: {
      name: 'Project 1'
    }
  }
  const projectStatus = {
    id: 1,
    type: 'project-statuses',
    attributes: {
      name: 'New'
    },
    relationships: {
      projects: {
        data: [project]
      }
    }
  }
  const factory = () => {
    const wrapper = createWrapper(Index, {
      mocks: {
        $store: {
          getters: {
            project: () => project,
            entry: () => project,
            projectStatus: () => projectStatus
          }
        }
      }
    })
    wrapper.setData({ projectsRefs: [project] })
    return wrapper
  }

  beforeEach(() => {
    dispatch.mockResolvedValue()
  })

  it('show title', async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('New')
  })

  it('show projects', async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('Project 1')
  })

  it('call destroyProjectStatus', () => {
    const wrapper = factory()

    wrapper.find('.fa-trash').trigger('click')
    expect(dispatch).toHaveBeenCalledWith('destroyProjectStatus', projectStatus)
  })
})
