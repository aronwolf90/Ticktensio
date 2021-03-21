import EditIssue from 'pages/issues/_id/edit'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('EditIssue', () => {
  const dispatch = sandbox.stub()

  afterEach(() => {
    sandbox.restore()
  })

  it('have title input', async () => {
    dispatch.returns(Promise.resolve())
    const issue = {
      id: 1,
      type: 'issues',
      attributes: {
        title: 'Test'
      }
    }
    const wrapper = createWrapper(EditIssue, {
      stubs: {
        'markdown-editor': true
      },
      data () {
        return { form: { attributes: {} } }
      },
      mocks: {
        $store: {
          dispatch,
          getters: {
            entry: () => issue
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('input#name-input').exists()).to.be.true
  })
})
