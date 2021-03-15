import Comments from 'components/comments'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Comments', () => {
  const comment = {
    id: 1,
    type: 'comments',
    attributes: {
      content: 'comment content'
    }
  }
  const dispatch = sandbox.stub()
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
    dispatch.withArgs('getProjectComments', Promise.resolve({ data: [comment] }))
  })

  it('contain comment', async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).to.include('comment content')
  })
})
