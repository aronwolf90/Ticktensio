import ProjectStatusNew from 'pages/project-statuses/new'

describe('pages/project-statuses/new.vue', () => {
  const factory = () => {
    return createWrapper(ProjectStatusNew, {
      attachToDocument: true
    })
  }

  beforeEach(() => {
    dispatch.mockResolvedValue()
  })

  it('calls createProjectStatus when submit is clicked', async () => {
    when(dispatch).calledWith('createProjectStatus', expect.anything()).mockResolvedValue({
      data: {
        data: {
          id: '1',
          type: 'project-statuses'
        }
      }
    })
    const wrapper = factory()
    wrapper.find('#input-name').element.value = 'New'
    wrapper.find('#input-name').trigger('input')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    expect(dispatch).toHaveBeenCalledWith('createProjectStatus', {
      attributes: {
        name: 'New',
        'display-as': 'list'
      }
    })
  })

  it('show errors when they are present', async () => {
    const wrapper = factory()
    when(dispatch).calledWith('createProjectStatus', expect.anything())
      .mockRejectedValue({
        status: 'fail',
        data: {
          errors: [{ source: { pointer: 'attributes/name' } }]
        }
      })
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.errors).toEqual([{ source: { pointer: 'attributes/name' } }])
  })
})
