import TicketCreatedBy from 'components/ticket/created-by'
import RightAsideItem from 'components/right-aside/item'

describe('TicketCreatedBy', () => {
  const issue = {
    id: '1',
    type: 'issues',
    relationships: {
      createdBy: {
        id: '1',
        type: 'users'
      }
    }
  }
  const user = {
    id: '1',
    type: 'users',
    attributes: {
      firstname: 'Lara',
      lastname: 'Croft'
    }
  }

  const factory = () => {
    return createWrapper(TicketCreatedBy, {
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
    when(relationship)
      .calledWith(issue, 'created-by')
      .mockReturnValue(user)
    const wrapper = factory()

    expect(wrapper.findComponent(RightAsideItem).props()).toEqual({
      label: 'Created by',
      labelFor: undefined,
      text: 'Lara Croft'
    })
  })

  it('does not render the component when created-by is not present', () => {
    when(entry)
      .calledWith({ id: '1', type: 'issues' })
      .mockReturnValue(issue)
    when(relationship)
      .calledWith(issue, 'created-by')
      .mockReturnValue(null)
    const wrapper = factory()

    expect(wrapper.html()).toEqual('')
  })
})
