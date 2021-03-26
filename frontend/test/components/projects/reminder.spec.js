import Reminder from 'components/projects/reminder'

describe('components/projects/reminder.vue', () => {
  const issue = {
    id: 1,
    type: 'issues',
    attributes: {
      title: 'Test title',
      status: 'none'
    }
  }

  const factory = () => {
    return createWrapper(Reminder, {
      stubs: { Reminder },
      propsData: {
        projectId: '1',
        type: 'issues',
        id: '1'
      }
    })
  }

  beforeEach(() => {
    dispatch.mockResolvedValue()
    entry.mockReturnValue(issue)
  })

  it('render reminders', () => {
    const wrapper = factory()

    expect(wrapper.html()).toContain('Test title')
  })

  it('trigger closeIssue when check is clicked', () => {
    const wrapper = factory()
    wrapper.find('.fa-check').trigger('click')

    expect(dispatch).toHaveBeenCalledWith('projectsShow/closeIssue', issue)
  })

  it('has .bg-warning when status is warning', () => {
    issue.attributes.status = 'warning'
    const wrapper = factory()

    expect(wrapper.find('.bg-warning').exists()).toBeTruthy()
    expect(wrapper.find('.text-secondary').exists()).toBeTruthy()
  })

  it('has .bg-warning when status is warning', () => {
    issue.attributes.status = 'danger'
    const wrapper = factory()

    expect(wrapper.find('.bg-danger.text-white').exists()).toBeTruthy()
    expect(wrapper.find('.text-secondary').exists()).not.toBeTruthy()
  })
})
