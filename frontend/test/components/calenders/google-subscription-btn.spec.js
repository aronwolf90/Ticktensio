import CalendarsGoogleSubscriptionBtn from 'components/calendars/google-subscription-btn'

describe('CalendarsGoogleSubscriptionBtn', () => {
  test('show "Integrate with google calendar" when isGoogleIntegrated is false', () => {
    const wrapper = createWrapper(CalendarsGoogleSubscriptionBtn, {
      propsData: {
        isGoogleIntegrated: false,
        authorizationUrl: 'href://www.example.com'
      }
    })

    expect(wrapper.html()).toContain('Integrate with google')
    expect(wrapper.html()).toContain('href://www.example.com')
  })

  test('show "Cancel google calendar integration" when isGoogleIntegrated< is true', () => {
    const wrapper = createWrapper(CalendarsGoogleSubscriptionBtn, {
      propsData: {
        isGoogleIntegrated: true,
        authorizationUrl: 'href://www.example.com'
      }
    })

    expect(wrapper.html()).toContain('Destroy google integration')
    expect(wrapper.html()).not.toContain('href://www.example.com')
  })

  test('shows the loading btn when loading === true and isGoogleIntegrated === true', () => {
    const wrapper = createWrapper(CalendarsGoogleSubscriptionBtn, {
      propsData: {
        loading: true,
        isGoogleIntegrated: true
      }
    })

    expect(wrapper.find('.spinner-border').exists()).toBeTruthy()
  })

  test('shows the loading btn when loading === true and isGoogleIntegrated === false', () => {
    const wrapper = createWrapper(CalendarsGoogleSubscriptionBtn, {
      propsData: {
        loading: true,
        isGoogleIntegrated: false
      }
    })

    expect(wrapper.find('.spinner-border').exists()).toBeTruthy()
  })

  test('does not show the loading btn when loading === false and isGoogleIntegrated === true', () => {
    const wrapper = createWrapper(CalendarsGoogleSubscriptionBtn, {
      propsData: {
        loading: false,
        isGoogleIntegrated: true
      }
    })

    expect(wrapper.find('.spinner-border').exists()).not.toBeTruthy()
  })

  test('does not show the loading btn when loading === false and isGoogleIntegrated === false', () => {
    const wrapper = createWrapper(CalendarsGoogleSubscriptionBtn, {
      propsData: {
        loading: false,
        isGoogleIntegrated: false
      }
    })

    expect(wrapper.find('.spinner-border').exists()).not.toBeTruthy()
  })

  test('does not show the loading btn when loading is not passed as prop', () => {
    const wrapper = createWrapper(CalendarsGoogleSubscriptionBtn)

    expect(wrapper.find('.spinner-border').exists()).not.toBeTruthy()
  })
})
