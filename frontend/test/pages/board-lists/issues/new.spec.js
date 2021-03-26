import BoardIssuesNew from 'pages/board-lists/issues/new'

describe('board/issues/new.vue', () => {
  let wrapper = null

  const options = {
    attachToDocument: true,
    stubs: {
      MarkdownEditor: true,
      MultiselectInput: true,
      textInput: true,
      UserSelect: true
    },
    mocks: {
      $store: {
        dispatch,
        getters: {
          collection: () => [],
          boardList: () => ({ id: 1, type: 'board-lists' }),
          selectedProject: { id: 1, type: 'projects' }
        }
      }
    }
  }

  beforeEach(() => {
    dispatch.mockReturnValue(Promise.resolve())
  })

  test('renders labels input', async () => {
    const entry = {
      id: 1,
      type: 'labels',
      attributes: {
        color: 'FF5733'
      }
    }
    options.mocks.$store.getters.collection = () => [entry]
    options.mocks.$store.getters.entry = () => entry
    wrapper = createWrapper(BoardIssuesNew, options)
    const labelInput = wrapper.find('#input-labels')

    expect(labelInput.props().options)
      .toEqual([{ id: 1, type: 'labels' }])
    expect(labelInput.props().getColor({ id: 1, type: 'labels' }))
      .toEqual('FF5733')
    expect(labelInput.props().value).toEqual([])
    expect(labelInput.props().errors).toEqual([])
  })

  test('calls createIssue when submit is clicked', async () => {
    wrapper = createWrapper(BoardIssuesNew, options)
    wrapper.vm.$router.push('/board_lists/1/issues/new')

    wrapper.find('#input-description').vm.$emit('input', 'description')
    wrapper.find('#input-labels').vm.$emit('input', [{ id: '1', type: 'labels' }])
    wrapper.find('#input-user').vm.$emit('input', { id: '1', type: 'users' })
    wrapper.find('#input-title').vm
      .$emit('input', 'title')
    await wrapper.vm.$nextTick()
    wrapper.find("[type='submit']").trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(dispatch).toBeCalledWith('createIssue', {
      attributes: {
        title: 'title',
        description: 'description'
      },
      relationships: {
        'board-list': {
          data: { id: 1, type: 'board-lists' }
        },
        project: {
          data: { id: 1, type: 'projects' }
        },
        labels: {
          data: [{ id: '1', type: 'labels' }]
        },
        user: {
          data: { id: '1', type: 'users' }
        }
      }
    })
    expect(wrapper.vm.$route.path).toEqual('/board_lists')
  })

  test('show errors when they are present', async () => {
    dispatch
      .mockImplementation(method => {
        if (method === 'createIssue') {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            status: 'fail',
            data: {
              errors: [{ source: { pointer: 'attributes/title' } }]
            }
          })
        } else {
          return Promise.resolve()
        }
      })
    wrapper = createWrapper(BoardIssuesNew, options)

    wrapper.find('[type="submit"]').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors).toEqual([{ source: { pointer: 'attributes/title' } }])
  })
})
