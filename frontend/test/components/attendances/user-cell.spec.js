import UserCell from 'components/attendances/user-cell'

describe('UserCell', () => {
  const user = {
    id: '1',
    type: 'users',
    attributes: {
      firstname: 'user'
    }
  }
  const factory = () => {
    return createWrapper(UserCell)
  }
  beforeEach(() => {
    entry.mockReturnValue(user)
  })

  test('render the element', () => {
    expect(factory().html()).toEqual('<td>user</td>')
  })
})
