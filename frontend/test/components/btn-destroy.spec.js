import BtnDestroy from 'components/btn-destroy'

describe('components/btn-destroy.vue', () => {
  const user = {
    id: '1',
    type: 'users',
    meta: {
      permissions: {
        destroy: true
      }
    }
  }
  const factory = (options = {}) => {
    return createWrapper(BtnDestroy, {
      mocks: {
        $store: {
          getters: {
            entry
          }
        }
      },
      propsData: {
        entryId: '1',
        entryType: 'users',
        variant: 'outline-danger',
        size: 'sm'
      },
      slots: {
        default: '<i class="fa fa-trash"></i>'
      },
      ...options
    })
  }

  beforeEach(() => {
    when(entry)
      .calledWith({ id: '1', type: 'users' })
      .mockReturnValue(user)
  })

  it('is rendered correctly', () => {
    const wrapper = factory()

    expect(wrapper.html())
      .toEqual('<button type="button" class="btn btn-outline-danger btn-sm"><i class="fa fa-trash"></i></button>')
  })

  it('is not rendered when meta.permissions.destroy === false', () => {
    const user = {
      id: '1',
      type: 'users',
      meta: {
        permissions: {
          destroy: false
        }
      }
    }
    when(entry)
      .calledWith({ id: '1', type: 'users' })
      .mockReturnValue(user)
    const wrapper = factory()

    expect(wrapper.html()).toEqual('')
  })

  it('emits destroy when is clicked and msgBoxConfirm resolved to true', async () => {
    const wrapper = factory()
    wrapper.vm.$bvModal.msgBoxConfirm = () => Promise.resolve(true)

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().destroy).toEqual([[]])
  })
})
