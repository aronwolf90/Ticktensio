import ProjectNew from 'pages/projects/new'

describe('ProjectNew', () => {
  const projectStatus = {
    id: 1,
    type: 'project-statuses',
    attributes: {
      name: 'Test'
    }
  }
  const factory = () => {
    return createWrapper(ProjectNew, {
      stubs: {
        'markdown-editor': true
      },
      mocks: {
        $store: {
          getters: {
            projectStatuses: [projectStatus]
          },
          dispatch
        }
      },
      attachToDocument: true
    })
  }

  it('calls createProject when submit is clicked', async () => {
    when(dispatch)
      .calledWith('getContacts')
      .mockResolvedValue({ data: [] })
      .calledWith('createProject', expect.anything())
      .mockResolvedValue()
    const wrapper = factory()

    wrapper.find('#input-name').element.value = 'New'
    wrapper.find('#input-name').trigger('input')
    wrapper.find('#input-project-status').vm.$emit('input', projectStatus)

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.find('[type="submit"]').trigger('click')
    expect(dispatch).toHaveBeenCalledWith('createProject', {
      attributes: {
        name: 'New',
        description: null
      },
      relationships: {
        'project-status': {
          data: projectStatus
        }
      }
    })
  })

  it('show errors when they are present', async () => {
    when(dispatch)
      .mockResolvedValue()
      .calledWith('getContacts')
      .mockResolvedValue({ data: [] })
      .calledWith('createProject', expect.anything())
      .mockRejectedValue({
        status: 'fail',
        data: {
          errors: [{ source: { pointer: 'attributes/name' } }]
        }
      })
    const wrapper = factory()

    wrapper.find('[type="submit"]').trigger('click')

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors).toEqual([{ source: { pointer: 'attributes/name' } }])
  })
})
