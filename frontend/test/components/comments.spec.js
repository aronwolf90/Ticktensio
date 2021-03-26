import Comments from 'components/comments'

describe('Comments', () => {
  const comment = {
    id: 1,
    type: 'comments',
    attributes: {
      content: 'comment content'
    }
  }
  const factory = () => {
    return createWrapper(Comments, {
      stubs: {
        'markdown-viewer': true,
        'markdown-editor': true
      },
      mocks: {
        $store: {
          getters: {
            'projectsShow/comments': [comment],
            projectComment: () => comment
          },
          dispatch
        }
      },
      propsData: {
        module: 'projectsShow'
      }
    })
  }
  beforeEach(() => {
    when(dispatch)
      .calledWith('getProjectComments', Promise.resolve({ data: [comment] }))
  })

  it('contain comment', async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('comment content')
  })
})
