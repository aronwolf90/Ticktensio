import DueAt from 'components/ticket/due-at'

describe('components/ticket/due-at.vue', () => {
  it('call updateIssue when submit button is clicked', async () => {
    const issue = { attributes: { 'due-at': '10-10-2020 00:00' } }
    when(dispatch)
      .mockResolvedValue()
      .calledWith('initIssue', '1')
      .mockResolvedValue({ data: issue })
    const wrapper = createWrapper(DueAt, {
      propsData: {
        issueId: '1'
      },
      mocks: {
        $store: {
          dispatch,
          getters: {
            issue: () => issue
          }
        }
      },
      attachToDocument: true
    })
    wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(dispatch).toHaveBeenCalledWith('updateIssue', {
      entry: issue,
      attributes: {
        'due-at': '10-10-2020 00:00'
      }
    })
  })

  it('show spinner when waiting for updateIssue Promise', async () => {
    const issue = { attributes: { 'due-at': '10-10-2020 00:00' } }
    let promiseResolve = null
    const promise = new Promise((resolve) => {
      promiseResolve = resolve
    })
    when(dispatch)
      .mockResolvedValue()
      .calledWith('initIssue', '1')
      .mockResolvedValue({ data: issue })
      .calledWith('updateIssue', expect.anything())
      .mockReturnValue(promise)
    const wrapper = createWrapper(DueAt, {
      propsData: {
        issueId: '1'
      },
      mocks: {
        $store: {
          dispatch,
          getters: {
            issue: () => issue
          }
        }
      },
      attachToDocument: true
    })
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.fa-spinner').exists()).toBeTruthy()
    promiseResolve()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.fa-spinner').exists()).not.toBeTruthy()
  })
})