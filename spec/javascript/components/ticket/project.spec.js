import createWrapper from '../../helper'
import TicketProject from 'components/ticket/project'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('components/ticket/board-list.vue', () => {
  const entry = sandbox.stub()
  const relationship = sandbox.stub()
  const dispatch = sandbox.stub()
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
            entry,
            relationship,
            'issuesShow/projects': [project]
          },
          dispatch
        }
      }
    })
  }

  afterEach(() => {
    sandbox.restore()
  })

  it('renders the component correctly', () => {
    entry.withArgs({ id: '1', type: 'issues' }).returns(issue)
    relationship.withArgs(issue, 'project').returns(project)
    const wrapper = factory()

    expect(wrapper.find('right-aside-select-stub').props()).to.eql({
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
    entry.withArgs({ id: '1', type: 'issues' }).returns(issue)
    relationship.withArgs(issue, 'project').returns(project)
    const wrapper = factory()

    wrapper.find('right-aside-select-stub').vm.$emit('search', 'Test')

    expect(dispatch).to.have.been.calledWith('issuesShow/getProjects', 'Test')
  })

  it('calls issuesShow/updateProject correctly when select is emited', () => {
    entry.withArgs({ id: '1', type: 'issues' }).returns(issue)
    entry.withArgs({ id: '1', type: 'projects' }).returns(project)
    relationship.withArgs(issue, 'project').returns(project)
    const wrapper = factory()

    const eventData = {
      text: 'Test',
      value: { id: '1', type: 'projects' }
    }
    wrapper.find('right-aside-select-stub').vm.$emit('select', eventData)

    expect(dispatch).to.have.been.calledWith('issuesShow/updateProject', project)
  })

  it('does not render the component when project is not present', () => {
    entry.withArgs({ id: '1', type: 'issues' }).returns(issue)
    relationship.withArgs(issue, 'project').returns(null)
    const wrapper = factory()

    expect(wrapper.html()).to.eq('')
  })
})
