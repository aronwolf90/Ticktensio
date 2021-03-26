import ProjectStatusNew from 'pages/project-statuses/_id/edit'

describe('pages/project-statuses/_id/edit.vue', () => {
  const projectStatus = {
    id: 1,
    type: 'project-statuses',
    attributes: {
      name: 'New',
      'display-as': 'list'
    },
    meta: {
      permissions: {
        destroy: true,
        create: true
      }
    }
  }
  const factory = () => {
    return createWrapper(ProjectStatusNew, {
      propsData: {
        id: '1'
      },
      mocks: {
        $store: {
          dispatch,
          getters: {
            projectStatus: () => projectStatus
          }
        }
      },
      attachToDocument: true
    })
  }

  beforeEach(() => {
    when(dispatch)
      .mockResolvedValue()
      .calledWith('getProjectStatus', '1')
      .mockResolvedValue({ data: projectStatus })
  })

  it('calls updateProjectStatus when submit is clicked', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('#input-name').trigger('input')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    expect(dispatch).toHaveBeenCalledWith('updateProjectStatus', {
      projectStatus,
      payload: {
        attributes: {
          name: 'New',
          'display-as': 'list'
        }
      }
    })
  })

  it('initialize inputs', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#input-name').element.value).toEqual('New')
  })

  it('show errors when they are present', async () => {
    when(dispatch).calledWith('updateProjectStatus', expect.anything()).mockRejectedValue({
      status: 'fail',
      data: {
        errors: [{ source: { pointer: 'attributes/name' } }]
      }
    })
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.errors).toEqual([{ source: { pointer: 'attributes/name' } }])
  })
})
