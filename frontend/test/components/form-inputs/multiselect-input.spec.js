import MultiselectInput from 'components/form-inputs/multiselect'

describe('MultiselectInput', () => {
  const factory = (propsData) => {
    return createWrapper(MultiselectInput, { propsData })
  }

  it('renders options, when they are selected', async () => {
    const propsData = {
      options: [{ id: '1', type: 'labels' }],
      value: [{ id: '1', type: 'labels' }],
      errors: [],
      getColor () { return 'yellow' },
      getLabel () { return 'test' }
    }
    const wrapper = factory(propsData)

    expect(wrapper.html()).toContain('yellow')
    expect(wrapper.html()).toContain('test')
  })

  it('does not render options, when none is selected', async () => {
    const propsData = {
      options: [{ id: '1', type: 'labels' }],
      value: [],
      errors: [],
      getColor () { return 'yellow' },
      getLabel () { return 'test' }
    }
    const wrapper = factory(propsData)

    expect(wrapper.html()).not.toContain('yellow')
    expect(wrapper.html()).not.toContain('test')
  })

  it('render errors, when they are present', async () => {
    const propsData = {
      options: [{ id: '1', type: 'labels' }],
      value: [],
      errors: [{ source: { pointer: 'this' }, detail: 'error text' }],
      getColor () { return 'yellow' },
      getLabel () { return 'test' }
    }
    const wrapper = factory(propsData)

    expect(wrapper.html()).not.toContain('error text')
  })

  it('does not render errors, when they are not present', async () => {
    const propsData = {
      options: [{ id: '1', type: 'labels' }],
      value: [],
      errors: [],
      getColor () { return 'yellow' },
      getLabel () { return 'test' }
    }
    const wrapper = factory(propsData)

    expect(wrapper.html()).not.toContain('error text')
  })
})
