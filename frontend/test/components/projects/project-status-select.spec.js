import ProjectStatusSelect from 'components/projects/project-status-select'

describe('components/projects/project-status-select.vue', () => {
  const projectStatus = {
    id: 1,
    type: 'project-statuses',
    attributes: {
      name: 'Test title'
    }
  }
  const project = {
    id: 1,
    type: 'projecs',
    attributes: {
      name: 'Test title'
    }
  }

  beforeEach(() => {
    dispatch.mockResolvedValue()
  })

  const factory = () => {
    return createWrapper(ProjectStatusSelect, {
      mocks: {
        $store: {
          getters: {
            projectStatuses: [projectStatus],
            projectStatus: projectStatus,
            project: project
          }
        }
      }
    })
  }

  it('render blank option', () => {
    const wrapper = factory()

    expect(wrapper.findAll('.item').at(0).element.textContent)
      .toEqual('\n      \n    ')
  })

  it('render options', () => {
    const wrapper = factory()

    expect(wrapper.html()).toContain('Test title')
  })

  it('render project status', () => {
    const wrapper = factory()

    expect(wrapper.findAll('.item').at(1).element.textContent)
      .toEqual('\n      Test title\n    ')
  })
})
