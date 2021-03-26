import ProjectSelect from 'components/form-inputs/user-select'
import SearchSelect from 'components/form-inputs/search-select'

describe('Comments', () => {
  const factory = (params = {}) => {
    return createWrapper(ProjectSelect, {
      stubs: {
        SearchSelect: true
      },
      ...params
    })
  }

  it('select value', () => {
    const propsData = { value: { id: '1', value: 'users' } }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.findComponent(SearchSelect)

    expect(searchSelect.vm.value).toEqual({ id: '1', value: 'users' })
  })

  it('pass label to searchSelect', () => {
    const propsData = { label: 'Test' }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.findComponent(SearchSelect)

    expect(searchSelect.vm.label).toEqual('Test')
  })

  it('renders options', () => {
    const user = {
      id: 1,
      type: 'users',
      attributes: {
        firstname: 'Lara',
        lastname: 'Cruise'
      }
    }
    when(collection).calledWith('users').mockReturnValue([user])

    const wrapper = factory()
    const searchSelect = wrapper.findComponent(SearchSelect)

    expect(searchSelect.vm.options).toEqual([{ id: 1, type: 'users' }])
  })

  it('emit input when receive input event', () => {
    const wrapper = factory({})
    const searchSelect = wrapper.findComponent(SearchSelect)

    searchSelect.vm.$emit('input', { id: 1, type: 'users' })

    expect(wrapper.emitted().input[0][0])
      .toEqual({ id: 1, type: 'users' })
  })
})
