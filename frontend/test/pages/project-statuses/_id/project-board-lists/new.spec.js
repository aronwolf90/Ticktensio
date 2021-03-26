import ProjectBoardListNew from 'pages/project-statuses/_id/project-board-lists/new'

describe('pages/project-statuses/_id/project-board-lists/new', () => {
  it('calls createProjectBoardList when submit is clicked', async () => {
    dispatch.mockResolvedValue()
    const wrapper = createWrapper(ProjectBoardListNew, {
      propsData: {
        projectStatusId: '1'
      },
      mocks: {
        $store: {
          dispatch
        }
      },
      attachToDocument: true
    })
    wrapper.find('#input-name').element.value = 'New'
    wrapper.find('#input-name').trigger('input')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(dispatch).toHaveBeenCalledWith('createProjectBoardList', {
      attributes: { name: 'New' },
      relationships: {
        'project-status': {
          data: {
            id: '1',
            type: 'project-statuses'
          }
        }
      }
    })
  })

  it('show errors when they are present', async () => {
    dispatch.mockRejectedValue({
      status: 'fail',
      data: {
        errors: [{ source: { pointer: 'attributes/name' } }]
      }
    })
    const wrapper = createWrapper(ProjectBoardListNew, {
      mocks: {
        $store: {
          dispatch
        }
      },
      attachToDocument: true
    })
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.errors).toEqual([{ source: { pointer: 'attributes/name' } }])
  })
})
