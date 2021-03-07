import UsersEdit from 'pages/users/_id/edit'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('pages/users/edit.spec.js', () => {
  const user = {
    id: '1',
    type: 'users'
  }
  const entry = sandbox.stub()
  const dispatch = sandbox.stub()
  const factory = () => {
    return createWrapper(UsersEdit, {
      stubs: {
        'form-input-avatar': true,
        'form-input-text': true,
        'btn-submit': true
      },
      mocks: {
        $store: {
          getters: {
            entry
          },
          dispatch
        }
      }
    })
  }

  it('can change inputs values and submit them', async () => {
    const wrapper = factory()
    let resolvePromise = null
    const updatePromise = new Promise(resolve => {
      resolvePromise = resolve
    })
    entry.withArgs({ id: '1', type: 'users' }).returns(user)
    dispatch.withArgs('update').returns(updatePromise)
    wrapper.setData({ userRef: { id: '1', type: 'users' } })

    wrapper.find('#avatar-input').vm
      .$emit('input', { id: '1', type: 'user-avatars' })
    wrapper.find('#firstname-input').vm
      .$emit('input', 'Lara')
    wrapper.find('#lastname-input').vm
      .$emit('input', 'Croft')
    wrapper.find('#email-input').vm
      .$emit('input', 'test@example.com')
    wrapper.find('#telephone-number-input').vm
      .$emit('input', '0876597345')
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.saving).to.eq(true)
    resolvePromise()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.saving).to.eq(false)
    expect(dispatch).to.have.been.calledWith('update', {
      entry: user,
      payload: {
        attributes: {
          firstname: 'Lara',
          lastname: 'Croft',
          email: 'test@example.com',
          'telephone-number': '0876597345'
        },
        relationships: {
          'user-avatar': {
            data: {
              id: '1',
              type: 'user-avatars'
            }
          }
        }
      }
    })
  })
})
