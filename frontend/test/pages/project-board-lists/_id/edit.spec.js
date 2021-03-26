import PagesProjectBoardListsIdEdit from 'pages/project-board-lists/_id/edit'

describe('pages/project-board-lists/_id/edit.vue', () => {
  const projectBoardList = {
    id: 1,
    type: 'project-board-lists',
    attributes: {
      name: 'New'
    },
    relationships: {
      'project-status': {
        data: { id: 1, type: 'project-statuses' }
      }
    },
    meta: {
      permissions: {
        destroy: true
      }
    }
  }
  const factory = () => {
    return createWrapper(PagesProjectBoardListsIdEdit, {
      propsData: {
        id: '1'
      },
      mocks: {
        $store: {
          getters: {
            projectBoardList: () => projectBoardList
          }
        }
      },
      attachToDocument: true
    })
  }

  beforeEach(() => {
    when(dispatch)
      .mockResolvedValue()
      .calledWith('getProjectBoardList', '1')
      .mockResolvedValue({ data: projectBoardList })
  })

  it('calls updateProjectBoardList when submit is clicked', async () => {
    const wrapper = factory()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('#input-name').element.value = 'New'
    wrapper.find('#input-name').trigger('input')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(dispatch).toHaveBeenCalledWith('updateProjectBoardList', {
      projectBoardList: projectBoardList,
      payload: {
        attributes: {
          name: 'New'
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
    const wrapper = factory()
    when(dispatch).calledWith('updateProjectBoardList', expect.anything())
      .mockRejectedValue({
        status: 'fail',
        data: {
          errors: [{ source: { pointer: 'attributes/name' } }]
        }
      })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.errors).toEqual([{ source: { pointer: 'attributes/name' } }])
  })
})
