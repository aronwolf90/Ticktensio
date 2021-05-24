import RightAsideSelectHeaderInput from 'components/right-aside/select-header-input'

describe('components/right-aside/select-header-input.vue', () => {
  const factory = ({ propsData = {} } = {}) => {
    return createWrapper(RightAsideSelectHeaderInput, {
      stubs: {
        'router-link': true
      },
      propsData: {
        value: { id: '1', type: 'contacts' },
        editMode: false,
        options: [
          { id: '1', type: 'contacts' },
          { id: '2', type: 'contacts' }
        ],
        getOptionLabel: () => 'test text',
        text: 'Title',
        link: '/issues/1',
        ...propsData
      }
    })
  }

  it('show value on non edit mode', () => {
    const wrapper = factory()

    expect(wrapper.html()).not.toContain('test text')
    expect(wrapper.html()).toContain('Title')
    expect(wrapper.find('router-link-stub').props().to).toEqual('/issues/1')
  })

  it('show value on edit mode', () => {
    const wrapper = factory({ propsData: { editMode: true } })

    expect(wrapper.html()).toContain('test text')
    expect(wrapper.html()).not.toContain('Title')
  })
})
