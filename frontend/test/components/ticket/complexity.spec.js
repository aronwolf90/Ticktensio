import Complexity from 'components/ticket/complexity'

describe('Complexity', () => {
  const factory = () => {
    return createWrapper(Complexity, {
      stubs: {
        'right-aside-select': true
      }
    })
  }

  it('has options', () => {
    const wrapper = factory()
    expect(wrapper.find('right-aside-select-stub').props().options).toEqual([
      { value: '0', text: '0' },
      { value: '0.5', text: '0.5' },
      { value: '1', text: '1' },
      { value: '2', text: '2' },
      { value: '3', text: '3' },
      { value: '5', text: '5' },
      { value: '8', text: '8' },
      { value: '13', text: '13' }
    ])
  })

  it('current complexity is displayed, when the issue has a complexity', () => {
    const issue = {
      id: 1,
      type: 'issues',
      attributes: { complexity: '0.5' }
    }
    entry.mockReturnValue(issue)
    const wrapper = factory()
    expect(wrapper.find('right-aside-select-stub').props().item).toEqual({
      value: '0.5',
      text: '0.5'
    })
  })

  it('no current complexity is displayed, when the issue has not a complexity', () => {
    const issue = {
      id: 1,
      type: 'issues'
    }
    entry.mockReturnValue(issue)
    const wrapper = factory()
    expect(wrapper.find('right-aside-select-stub').props().item).toEqual(undefined)
  })

  it('call updateIssue, when an option is selected', async () => {
    const issue = {
      id: 1,
      type: 'issues'
    }
    entry.mockReturnValue(issue)
    const wrapper = factory()
    wrapper.find('right-aside-select-stub').vm.$emit('select', { value: '0.5' })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(dispatch).toHaveBeenCalledWith(
      'updateIssue',
      {
        entry: {
          id: 1,
          type: 'issues'
        },
        attributes: {
          complexity: '0.5'
        }
      }
    )
  })
})
