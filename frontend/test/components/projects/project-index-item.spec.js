import ProjectIndexItem from 'components/projects/project-index-item'

describe('components/projects/project-index-item.vue', () => {
  const project = {
    id: 1,
    type: 'projects',
    attributes: {
      name: 'Test title'
    }
  }
  const projectStatus = {
    id: 1,
    type: 'project-statuses',
    attributes: {
      name: 'Test title'
    }
  }

  const factory = () => {
    return createWrapper(ProjectIndexItem, {
      propsData: { projectId: 1, projectType: 'projects' }
    })
  }

  beforeEach(() => {
    dispatch.mockResolvedValue()
    entry.mockReturnValue(project)
    relationship.mockReturnValue(projectStatus)
  })

  it('render name', async () => {
    const wrapper = factory()

    expect(wrapper.html()).toContain('Test title')
  })

  it('render edit btn', () => {
    const wrapper = factory()

    expect(wrapper.find('.fa.fa-edit').exists()).toBeTruthy()
  })
})
