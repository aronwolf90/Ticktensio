import Edit from 'pages/admin/context/edit'

describe('pages/admin/context/edit.vue', () => {
  const context = {
    id: 1,
    type: 'contexts',
    attributes: {
      'time-zone': 'Berlin',
      'global-board': false
    }
  }
  const factory = () => {
    return createWrapper(Edit, {
      mocks: {
        $store: {
          getters: {
            context
          }
        }
      },
      attachToDocument: true
    })
  }

  beforeEach(() => {
    when(dispatch)
      .mockResolvedValue()
      .calledWith('getContext')
      .mockResolvedValue({ data: context })
  })

  it('set attributes from context', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.form.attributes).toEqual({ 'time-zone': 'Berlin', 'global-board': false })
  })

  it.skip('calls updateOrganization when submit is clicked', async () => {
  //  const wrapper = factory()
  //  wrapper.findAll('option').at(1).element.selected = true
  //  wrapper.find('select').trigger('change')
  //  wrapper.find('input[type="checkbox"]').trigger('click')
  //  wrapper.find('input[type="checkbox"]').trigger('change')
  //  await wrapper.vm.$nextTick()
  //  await wrapper.vm.$nextTick()
  //  sandbox.stub(window.location, 'replace')
  //  wrapper.find('[type="submit"]').trigger('click')
  })

  it.skip('calls location.replate when no error is present', async () => {
  //  const wrapper = factory()
  //  wrapper.findAll('option').at(1).element.selected = true
  //  wrapper.find('select').trigger('change')
  //  await wrapper.vm.$nextTick()
  //  await wrapper.vm.$nextTick()
  //  sandbox.stub(window.location, 'replace')
  //  wrapper.find('[type="submit"]').trigger('click')
  })

  it('show errors when they are present', async () => {
    const wrapper = factory()
    when(dispatch).calledWith('updateContext', expect.anything()).mockRejectedValue({
      status: 'fail',
      data: { errors: [{ source: { pointer: 'attributes/time-zone' } }] }
    })
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.errors).toEqual([{ source: { pointer: 'attributes/time-zone' } }])
  })
})
