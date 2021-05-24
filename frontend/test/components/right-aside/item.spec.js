import RightAsideItem from 'components/right-aside/item'

describe('components/right-aside/item.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = createWrapper(RightAsideItem, {
      propsData: {
        label: 'Created by',
        text: 'Lara Croft'
      }
    })

    expect(wrapper.html()).toContain('Created by')
    expect(wrapper.html()).toContain('Lara Croft')
  })

  it('renders the header slot', () => {
    const wrapper = createWrapper(RightAsideItem, {
      slots: {
        header: '<header-slot></header-slot>'
      }
    })

    expect(wrapper.html()).toContain('header-slot')
  })

  it('renders the content slot', () => {
    const wrapper = createWrapper(RightAsideItem, {
      slots: {
        content: '<content-slot></content-slot>'
      }
    })

    expect(wrapper.html()).toContain('content-slot')
  })
})
