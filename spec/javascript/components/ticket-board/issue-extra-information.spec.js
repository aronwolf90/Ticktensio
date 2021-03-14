import createWrapper from '../../helper'
import IssueExtraInformation from 'components/ticket-board/issue-extra-information'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('IssueExtraInformation', () => {
  const entry = sandbox.stub()
  const relationship = sandbox.stub()
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
    entry.withArgs({ id: '1', type: 'issues' }).returns(issue)
    relationship.withArgs(issue, 'labels').returns([{
      id: '1',
      type: 'labels',
      attributes: {
        name: 'Test label'
      }
    }])
    relationship.withArgs(issue, 'user').returns(user)
    relationship.withArgs(issue, 'project').returns(project)
  })

  afterEach(() => {
    sandbox.restore()
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

    expect(wrapper.html()).to.include('Test label')
    expect(wrapper.html()).to.include('avatar.png')
    expect(wrapper.html()).to.include('1.0')
    expect(wrapper.html()).to.include('Lara Croft')
    expect(wrapper.html()).to.include('img')
  })

  it('does not an image when user is not present', () => {
    relationship.withArgs(issue, 'user').returns(null)
    const wrapper = factory({
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        }
      }
    })
    expect(wrapper.html()).not.to.include('img')
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
    expect(wrapper.html()).to.include('Project')
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
    expect(wrapper.html()).not.to.include('Project')
  })
})
