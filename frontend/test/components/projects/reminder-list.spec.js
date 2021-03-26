import ReminderList from 'components/projects/reminder-list'
import Reminder from 'components/projects/reminder'

describe('ReminderList', () => {
  const issue = { id: 1, type: 'issues' }

  beforeEach(() => {
    dispatch.mockResolvedValue()
  })

  const factory = () => {
    return createWrapper(ReminderList, {
      stubs: { reminder: true },
      mocks: {
        $store: {
          getters: {
            'projectsShow/reminders': [issue]
          }
        }
      }
    })
  }

  it('render reminders', () => {
    const wrapper = factory()

    expect(wrapper.findComponent(Reminder).exists()).toBeTruthy()
  })
})
