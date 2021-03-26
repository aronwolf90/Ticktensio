import SearchSelect from 'components/form-inputs/search-select'
import VSelect from 'vue-select'

describe('DetailsStringInput', () => {
  const factory = (propsData) => {
    return createWrapper(SearchSelect, {
      stubs: {
        VSelect: true
      },
      propsData
    })
  }

  it('renders options', () => {
    const propsData = {
      options: [{ id: '1', type: 'users' }]
    }
    const wrapper = factory(propsData)
    const vSelect = wrapper.findComponent(VSelect)

    expect(vSelect.vm.options).toEqual([{ id: '1', type: 'users' }])
  })

  it('select value', async () => {
    const propsData = {
      value: { id: '1', type: 'users' },
      options: [{ id: '1', type: 'users' }]
    }
    const wrapper = factory(propsData)
    const vSelect = wrapper.findComponent(VSelect)

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(vSelect.vm.value).toEqual({ id: '1', type: 'users' })
  })

  it('renders label', () => {
    const propsData = {
      label: 'Test'
    }
    const wrapper = factory(propsData)

    expect(wrapper.html()).toContain('Test')
  })

  it('renders error', async () => {
    const propsData = {
      label: 'Project',
      errorPath: '/data/attributes/description',
      errors: [{
        source: {
          pointer: '/data/attributes/description'
        },
        detail: 'Test'
      }]
    }
    const wrapper = factory(propsData)

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('Test')
  })
})
