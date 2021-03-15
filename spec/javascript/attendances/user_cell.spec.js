import UserCell from 'attendances/user_cell'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('UserCell', () => {
  const entry = sandbox.stub()
  const user = {
    id: '1',
    type: 'users',
    attributes: {
      firstname: 'user'
    }
  }
  const factory = () => {
    return createWrapper(UserCell, {
      mocks: {
        $store: {
          getters: {
            entry
          }
        }
      }
    })
  }
  beforeEach(() => {
    entry.returns(user)
  })

  it('render the element', () => {
    expect(factory().html()).to.eq('<td>user</td>')
  })
})
