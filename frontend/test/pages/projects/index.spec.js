import ProjectIndex from 'pages/projects/index'

describe('ProjectIndex', () => {
  it('renders project index item', () => {
    const project = {
      id: 1,
      type: 'projects',
      attributes: { name: 'Test name' }
    }
    when(entry).calledWith({ id: 1, type: 'projects' }).mockReturnValue(project)
    const wrapper = createWrapper(ProjectIndex, {
      mocks: {
        $store: {
          getters: {
            'projectsIndex/projects': [project]
          }
        }
      },
      stubs: { 'project-index-item': true }
    })

    expect(wrapper.html()).toContain('project-index-item-stub')
  })
})
