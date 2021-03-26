import NotificationBell from 'components/notification_bell'

describe('NotificationBell', () => {
  it('show spinner when the promise is not resolved', async () => {
    when(dispatch)
      .calledWith('getNotifications')
      .mockReturnValue(new Promise(() => null))
    const wrapper = createWrapper(NotificationBell, {
      attachToDocument: true
    })
    await wrapper.find('button').click

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.fa-spinner').exists()).toBeTruthy()
  })

  it('show message when no notifications exist', async () => {
    when(dispatch)
      .calledWith('getNotifications')
      .mockResolvedValue({
        data: [],
        links: { next: null },
        meta: { 'unread-count': 0 }
      })
    const wrapper = createWrapper(NotificationBell)
    await wrapper.find('button').click

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('There are no notifications yet')
  })
})
