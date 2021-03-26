import SearchSelectItem from 'components/search-select-item'

describe('SearchSelectItem', () => {
  it('render it correctly', () => {
    const wrapper = createWrapper(SearchSelectItem, {
      propsData: {
        title: 'Test title',
        link: '/test-link'
      },
      slots: {
        default: '<div>Test slot</div>'
      }
    })

    expect(wrapper.html()).toContain('Test title')
    expect(wrapper.html()).toContain('/test-link')
    expect(wrapper.html()).toContain('<div>Test slot</div>')
  })
})
