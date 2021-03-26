import DetailsDateTime from 'components/details-date-time'

describe('components/details-date-time.vue', () => {
  it('form and input is present', () => {
    const wrapper = createWrapper(DetailsDateTime, {
      attachToDocument: true
    })
    expect(wrapper.find('form').exists()).toBeTruthy()
    expect(wrapper.find('input').exists()).toBeTruthy()
  })

  it('send submit event when submit is called', () => {
    const wrapper = createWrapper(DetailsDateTime, {
      attachToDocument: true
    })
    wrapper.find('[type="submit"]').trigger('click')
    expect(wrapper.emitted().submit).not.toEqual(null)
  })

  it('show spinner when when isSaving==false', () => {
    const wrapper = createWrapper(DetailsDateTime, {
      attachToDocument: true,
      propsData: {
        isSaving: false
      }
    })
    expect(wrapper.find('.fa-spinner').exists()).not.toBeTruthy()
  })

  it('show spinner when when isSaving==true', () => {
    const wrapper = createWrapper(DetailsDateTime, {
      attachToDocument: true,
      propsData: {
        isSaving: true
      }
    })
    expect(wrapper.find('.fa-spinner').exists()).toBeTruthy()
  })

  it('show submit button when isPersisted==true', () => {
    const wrapper = createWrapper(DetailsDateTime, {
      attachToDocument: true,
      propsData: {
        isPersisted: true
      }
    })
    expect(wrapper.find('.persisted').exists()).toBeTruthy()
  })

  it('do not show submit button when isPersisted==true', () => {
    const wrapper = createWrapper(DetailsDateTime, {
      attachToDocument: true,
      propsData: {
        isPersisted: false
      }
    })
    expect(wrapper.find('.persisted').exists()).not.toBeTruthy()
  })
})
