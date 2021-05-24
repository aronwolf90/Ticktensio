import TicketCreatedAt from 'components/ticket/created-at'
import RightAsideItem from 'components/right-aside/item'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('components/ticket/created-at.vue', () => {
  const issue = {
    id: '1',
    type: 'issues',
    attributes: {
      'created-at': '10-10-2020 10:10'
    }
  }
  const factory = () => {
    return createWrapper(TicketCreatedAt, {
      stubs: {
        'right-aside-item': true
      },
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        }
      }
    })
  }

  it('renders the component correctly', () => {
    when(entry)
      .calledWith({ id: '1', type: 'issues' })
      .mockReturnValue(issue)
    const wrapper = factory()

    expect(wrapper.findComponent(RightAsideItem).props()).toEqual({
      label: 'Created at',
      labelFor: undefined,
      text: '10-10-2020 10:10'
    })
  })

  it('does not render the component when issue is not present', () => {
    when(entry)
      .calledWith({ id: '1', type: 'issues' })
      .mockReturnValue(null)
    const wrapper = factory()

    expect(wrapper.html()).toEqual('')
  })
})
