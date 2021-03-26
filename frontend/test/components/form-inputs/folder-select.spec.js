import FoldersSelect from 'components/form-inputs/folder-select'

describe('components/form-inputs/folder-select.vue', () => {
  const folder = {
    id: 1,
    type: 'folders',
    attributes: { name: 'Folder' }
  }
  const factory = (params = {}) => {
    return createWrapper(FoldersSelect, {
      stubs: {
        'search-select': true
      },
      ...params
    })
  }

  beforeEach(() => {
    when(dispatch)
      .mockReturnValue(Promise.resolve())
      .calledWith('get', '/api/v1/folders?query=&filter[project_id]=null', '')
      .mockReturnValue(Promise.resolve({ data: [folder] }))
    when(entry)
      .calledWith({ id: 1, type: 'folders' })
      .mockReturnValue(folder)
  })

  it('select value', () => {
    const propsData = { value: { id: '1', type: 'folders' } }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.value).toEqual({ id: '1', type: 'folders' })
  })

  it('renders label', () => {
    const propsData = { label: 'Folder' }
    const wrapper = factory({ propsData })
    const searchSelect = wrapper.find('search-select-stub')

    expect(searchSelect.vm.label).toEqual('Folder')
  })

  it('renders options', async () => {
    const wrapper = factory()
    const searchSelect = wrapper.find('search-select-stub')

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(searchSelect.vm.folderRefs).toEqual([{ id: 1, type: 'folders' }])
    expect(searchSelect.vm.getOptionLabel({ id: 1, type: 'folders' }))
      .toEqual('Folder')
  })

  it('emit input when receive input event', () => {
    const wrapper = factory({})
    const searchSelect = wrapper.find('search-select-stub')

    searchSelect.vm.$emit('input', { id: '1', type: 'folders' })

    expect(wrapper.emitted().input[0][0]).toEqual({ id: '1', type: 'folders' })
  })
})
