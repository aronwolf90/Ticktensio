import ProjectNew from 'pages/projects/new'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-promise-reject-errors */

describe('ProjectNew', () => {
  const projectStatus = {
    id: 1,
    type: 'project-statuses',
    attributes: {
      name: 'Test'
    }
  }
  const dispatch = sandbox.stub()
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
    dispatch.withArgs('getContacts').returns(Promise.resolve({ data: [] }))
    dispatch.withArgs('createProject').returns(Promise.resolve())
    const wrapper = factory()

    wrapper.find('#input-name').element.value = 'New'
    wrapper.find('#input-name').trigger('input')
    wrapper.find('#input-project-status').vm.$emit('input', projectStatus)

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    wrapper.find('[type="submit"]').trigger('click')
    expect(dispatch).to.have.been.calledWith('createProject', {
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
    dispatch.withArgs('getContacts').returns(Promise.resolve({ data: [] }))
    dispatch.withArgs('createProject').returns(Promise.reject({
      status: 'fail',
      data: {
        errors: [{ source: { pointer: 'attributes/name' } }]
      }
    }))
    const wrapper = factory()

    wrapper.find('[type="submit"]').trigger('click')

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors).to.eql([{ source: { pointer: 'attributes/name' } }])
  })
})
