import ProjectStatusNew from 'pages/project-statuses/new'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-promise-reject-errors */

describe('pages/project-statuses/new.vue', () => {
  afterEach(() => sandbox.restore())

  const dispatch = sandbox.stub()
  const factory = () => {
    return createWrapper(ProjectStatusNew, {
      mocks: {
        $store: {
          dispatch
        }
      },
      attachToDocument: true
    })
  }

  beforeEach(() => {
    dispatch.returns(Promise.resolve())
  })

  it('calls createProjectStatus when submit is clicked', async () => {
    dispatch.withArgs('createProjectStatus').returns(Promise.resolve({
      data: {
        data: {
          id: '1',
          type: 'project-statuses'
        }
      }
    }))
    const wrapper = factory()
    wrapper.find('#input-name').element.value = 'New'
    wrapper.find('#input-name').trigger('input')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    expect(dispatch).to.have.been.calledWith('createProjectStatus', {
      attributes: {
        name: 'New',
        'display-as': 'list'
      }
    })
  })

  it('show errors when they are present', async () => {
    const wrapper = factory()
    dispatch.withArgs('createProjectStatus')
      .returns(Promise.reject({
        status: 'fail',
        data: {
          errors: [{ source: { pointer: 'attributes/name' } }]
        }
      }))
    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.errors).to.eql([{ source: { pointer: 'attributes/name' } }])
  })
})
