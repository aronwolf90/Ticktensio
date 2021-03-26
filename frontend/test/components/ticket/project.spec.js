import TicketProject from 'components/ticket/project'

describe('components/ticket/board-list.vue', () => {
  const issue = {
    id: '1',
    type: 'issues',
    relationships: {
      project: {
        data: {
          id: '1',
          type: 'projects'
        }
      }
    }
  }
  const project = {
    id: '1',
    type: 'projects',
    attributes: {
      name: 'Test'
    }
  }

  const factory = () => {
    return createWrapper(TicketProject, {
      stubs: {
        'right-aside-select': true
      },
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        }
      },
      mocks: {
        $store: {
          getters: {
            'issuesShow/projects': [project]
          }
        }
      }
    })
  }

  it('renders the component correctly', () => {
    when(entry)
      .calledWith({ id: '1', type: 'issues' })
      .mockReturnValue(issue)
    when(relationship)
      .calledWith(issue, 'project')
      .mockReturnValue(project)
    const wrapper = factory()

    expect(wrapper.find('right-aside-select-stub').props()).toEqual({
      label: 'Project',
      item: {
        text: 'Test',
        value: { id: '1', type: 'projects' }
      },
      options: [
        {
          text: 'Test',
          value: {
            id: '1',
            type: 'projects'
          }
        }
      ]
    })
  })

  it('calls issuesShow/getProjects when search is emited', () => {
    when(entry)
      .calledWith({ id: '1', type: 'issues' })
      .mockReturnValue(issue)
    when(relationship)
      .calledWith(issue, 'project')
      .mockReturnValue(project)
    const wrapper = factory()

    wrapper.find('right-aside-select-stub').vm.$emit('search', 'Test')

    expect(dispatch)
      .toHaveBeenCalledWith('issuesShow/getProjects', 'Test')
  })

  it('calls issuesShow/updateProject correctly when select is emited', () => {
    when(entry)
      .calledWith({ id: '1', type: 'issues' })
      .mockReturnValue(issue)
      .calledWith({ id: '1', type: 'projects' })
      .mockReturnValue(project)
    when(relationship)
      .calledWith(issue, 'project')
      .mockReturnValue(project)
    const wrapper = factory()

    const eventData = {
      text: 'Test',
      value: { id: '1', type: 'projects' }
    }
    wrapper.find('right-aside-select-stub').vm.$emit('select', eventData)

    expect(dispatch).toHaveBeenCalledWith('issuesShow/updateProject', project)
  })

  it('does not render the component when project is not present', () => {
    when(entry)
      .calledWith({ id: '1', type: 'issues' })
      .mockReturnValue(issue)
    when(relationship)
      .calledWith(issue, 'project')
      .mockReturnValue(null)
    const wrapper = factory()

    expect(wrapper.html()).toEqual('')
  })
})
