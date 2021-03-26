import ProjectSelect from 'components/form-inputs/project-select'

describe('components/form-inputs/project-select.vue', () => {
  const factory = (params = {}) => {
    return createWrapper(ProjectSelect, {
      stubs: {
        'search-select': true
      },
      ...params
    })
  }

  it('select value', () => {
    const propsData = { value: { id: '1', type: 'projects' } }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.value)
      .toEqual({ id: '1', type: 'projects' })
  })

  it('renders label', () => {
    const propsData = { label: 'Test' }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.label).toEqual('Test')
  })

  it('renders options', () => {
    const project = {
      id: 1,
      type: 'projects',
      attributes: { name: 'Test' }
    }
    when(collection)
      .calledWith('projects')
      .mockReturnValueOnce([project])
    const wrapper = factory({
      mocks: {
        $store: {
          getters: {
            collection
          }
        }
      }
    })
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.options)
      .toEqual([{ id: 1, type: 'projects' }])
  })

  it('emit input when receive input event', () => {
    const wrapper = factory({})
    const searchSelect = wrapper.find('search-select-stub')

    searchSelect.vm.$emit('input', { id: '1', type: 'projects' })

    expect(wrapper.emitted().input[0][0]).toEqual({ id: '1', type: 'projects' })
  })
})
