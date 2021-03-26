import ProjectSelect from 'components/form-inputs/issue-select'

describe('components/form-inputs/issue-select.vue', () => {
  const factory = (params = {}) => {
    return createWrapper(ProjectSelect, {
      stubs: {
        'search-select': true
      },
      ...params
    })
  }

  it('select value', () => {
    const propsData = { value: { id: '1', type: 'issues' } }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.value).toEqual({ id: '1', type: 'issues' })
  })

  it('renders label', () => {
    const propsData = { label: 'Test' }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.label).toEqual('Test')
  })

  it('renders options', () => {
    const issue = {
      id: 1,
      type: 'issues',
      attributes: { name: 'Test' }
    }
    when(collection).calledWith('issues').mockReturnValue([issue])
    const wrapper = factory()
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.options).toEqual([{ id: 1, type: 'issues' }])
  })

  it('emit input when receive input event', () => {
    const wrapper = factory({})
    const searchSelect = wrapper.find('search-select-stub')

    searchSelect.vm.$emit('input', { id: '1', type: 'issues' })

    expect(wrapper.emitted().input[0][0]).toEqual({ id: '1', type: 'issues' })
  })
})
