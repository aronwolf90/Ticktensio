import DetailsStringInput from 'components/details-string-input'

describe('components/details-string-input.vue', () => {
  it('show value on non edit mode', () => {
    const wrapper = createWrapper(DetailsStringInput, {
      attachToDocument: true,
      propsData: {
        value: 'test text',
        editMode: false
      }
    })
    expect(wrapper.html()).toContain('test text')
  })

  it('show value on edit mode', async () => {
    const wrapper = createWrapper(DetailsStringInput, {
      attachToDocument: true,
      propsData: {
        value: 'test text',
        editMode: true
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').element.value)
      .toContain('test text')
  })

  it('show value on edit mode', async () => {
    const wrapper = createWrapper(DetailsStringInput, {
      attachToDocument: true,
      propsData: {
        editMode: true,
        value: 'test text'
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').element.value)
      .toContain('test text')
  })

  it('changes to edit mode when edit btn is clicked', async () => {
    const wrapper = createWrapper(DetailsStringInput, {
      attachToDocument: true,
      propsData: {
        editMode: false,
        value: 'test text'
      }
    })
    wrapper.find('.fa-edit').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').exists()).toBeTruthy()
  })

  it('emit value when input change', async () => {
    const wrapper = createWrapper(DetailsStringInput, {
      attachToDocument: true,
      propsData: {
        editMode: true,
        value: ''
      }
    })
    wrapper.find('input').element.value = 'test value'
    wrapper.find('input').trigger('input')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input[0][0])
      .toEqual('test value')
  })

  it('spinner works correctly', async () => {
    const wrapper = createWrapper(DetailsStringInput, {
      attachToDocument: true,
      propsData: {
        editMode: true
      }
    })
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('fa-spinner')
    wrapper.setProps({ editMode: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').exists()).not.toBeTruthy()
    wrapper.setProps({ editMode: true })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.html()).not.toContain('fa-spinner')
  })
})
