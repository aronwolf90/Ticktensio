import IssueExtraInformation from 'components/ticket-board/issue-extra-information'

describe('components/ticket-board/issue-extra-information.vue', () => {
  const issue = {
    id: '1',
    type: 'issues',
    attributes: {
      title: 'Test title',
      complexity: '1.0'
    },
    relationships: {
      labels: [{
        id: '1',
        type: 'labels'
      }],
      project: {
        id: '1',
        type: 'projects'
      }
    }
  }
  const project = {
    id: '1',
    type: 'projects',
    attributes: {
      name: 'Project'
    }
  }
  const factory = ({ propsData = {}, boardProject = null } = {}) => {
    return createWrapper(IssueExtraInformation, {
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        },
        ...propsData
      },
      mocks: {
        $store: {
          getters: {
            entry,
            relationship,
            'board/project': boardProject
          }
        }
      }
    })
  }

  beforeEach(() => {
    const user = {
      id: '1',
      type: 'users',
      attributes: {
        'avatar-url': 'avatar.png',
        firstname: 'Lara',
        lastname: 'Croft'
      },
      relationships: {
        labels: [{
          id: '1',
          type: 'labels'
        }]
      }
    }
    when(entry)
      .calledWith({ id: '1', type: 'issues' })
      .mockReturnValue(issue)
    when(relationship)
      .calledWith(issue, 'labels')
      .mockReturnValue([{
        id: '1',
        type: 'labels',
        attributes: {
          name: 'Test label'
        }
      }])
      .calledWith(issue, 'user')
      .mockReturnValue(user)
      .calledWith(issue, 'project')
      .mockReturnValue(project)
  })

  it('renders the component', () => {
    const wrapper = factory({
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        }
      }
    })

    expect(wrapper.html()).toContain('Test label')
    expect(wrapper.html()).toContain('avatar.png')
    expect(wrapper.html()).toContain('1.0')
    expect(wrapper.html()).toContain('Lara Croft')
    expect(wrapper.html()).toContain('img')
  })

  it('does not an image when user is not present', () => {
    when(relationship).calledWith(issue, 'user').mockReturnValue(null)
    const wrapper = factory({
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        }
      }
    })
    expect(wrapper.html()).not.toContain('img')
  })

  it('shows project when was not filtered for a project', () => {
    const wrapper = factory({
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        }
      },
      boardProject: null
    })
    expect(wrapper.html()).toContain('Project')
  })

  it('does not show the project when was filtered for a project', () => {
    const wrapper = factory({
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        }
      },
      boardProject: {
        id: '1',
        type: 'projects'
      }
    })
    expect(wrapper.html()).not.toContain('Project')
  })
})
