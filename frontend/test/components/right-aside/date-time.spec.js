import RightAsideDateTime from 'components/right-aside/date-time'

describe('components/details-date-time.vue', () => {
  const factory = (options = {}) => {
    return createWrapper(RightAsideDateTime, {
      attachToDocument: true,
      ...options
    })
  }

  it('form and input is present', () => {
    const wrapper = factory()
    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.find('input').exists()).toBeTruthy()
  })

  it('send submit event when submit is called', () => {
    const wrapper = factory()
    wrapper.find('[type="submit"]').trigger('click')
    expect(wrapper.emitted().submit).not.toEqual(null)
  })

  it('show spinner when when isSaving==false', () => {
    const wrapper = factory({
      propsData: {
        isSaving: false
      }
    })
    expect(wrapper.find('.fa-spinner').exists()).not.toBeTruthy()
  })

  it('show spinner when when isSaving==true', () => {
    const wrapper = factory({
      propsData: {
        isSaving: true
      }
    })
    expect(wrapper.find('.fa-spinner').exists()).toBeTruthy()
  })

  it('show submit button when isPersisted==true', () => {
    const wrapper = factory({
      propsData: {
        isPersisted: true
      }
    })
    expect(wrapper.find('.persisted').exists()).toBeTruthy()
  })

  it('do not show submit button when isPersisted==true', () => {
    const wrapper = factory({
      propsData: {
        isPersisted: false
      }
    })
    expect(wrapper.find('.persisted').exists()).not.toBeTruthy()
  })
})
