import EditIssue from 'pages/issues/_id/edit'

describe('pages/issues/_id/edit.vue', () => {
  it('have title input', async () => {
    dispatch.mockResolvedValue()
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
          getters: {
            entry: () => issue
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('input#name-input').exists()).toBeTruthy()
  })
})
