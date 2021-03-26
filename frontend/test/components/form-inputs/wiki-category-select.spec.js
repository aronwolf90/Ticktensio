import WikiCategorySelect from 'components/form-inputs/wiki-category-select'

describe('components/form-inputs/wiki-category-select.vue', () => {
  const wikiCategory = {
    id: 1,
    type: 'wiki-categories',
    attributes: { title: 'Title' }
  }
  const factory = (params = {}) => {
    when(dispatch)
      .calledWith('get', '/api/v1/wiki_categories?query=', '')
      .mockReturnValue(Promise.resolve({ data: [wikiCategory] }))
    when(entry)
      .calledWith({ id: 1, type: 'wiki-categories' })
      .mockReturnValue(wikiCategory)
    return createWrapper(WikiCategorySelect, {
      stubs: {
        'search-select': true
      },
      ...params
    })
  }

  it('select value', () => {
    const propsData = { value: { id: '1', type: 'wiki-categories' } }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.value)
      .toEqual({ id: '1', type: 'wiki-categories' })
  })

  it('renders label', () => {
    const propsData = { label: 'Category' }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.label).toEqual('Category')
  })

  it('renders options', async () => {
    const wrapper = factory()
    const searchSelect = wrapper.find('search-select-stub')

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(searchSelect.vm.wikiCategoryRefs)
      .toEqual([{ id: 1, type: 'wiki-categories' }])
    expect(
      searchSelect.vm.getOptionLabel({ id: 1, type: 'wiki-categories' })
    ).toEqual('Title')
  })

  it('emit input when receive input event', () => {
    const wrapper = factory({})
    const searchSelect = wrapper.find('search-select-stub')

    searchSelect.vm.$emit('input', { id: '1', type: 'wiki-categories' })

    expect(wrapper.emitted().input[0][0])
      .toEqual({ id: '1', type: 'wiki-categories' })
  })
})
