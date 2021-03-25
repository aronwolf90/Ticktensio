import PagesWikiPagesNew from 'pages/wiki/pages/new'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('pages/wiki/pages/new', () => {
  const dispatch = sandbox.stub()
  const factory = () => {
    const wrapper = createWrapper(PagesWikiPagesNew, {
      mocks: {
        $store: {
          dispatch
        }
      },
      attachToDocument: true
    })
    wrapper.vm.$router.push('/wiki/pages/new')
    return wrapper
  }

  beforeEach(() => {
    dispatch.returns(Promise.resolve())
  })

  it('can fill and submit the form', async () => {
    dispatch.withArgs('createProjectStatus').returns(Promise.resolve({
      data: {
        data: {
          id: '1',
          type: 'project-statuses'
        }
      }
    }))
    const wrapper = factory()
    wrapper.find('#input-title')
      .vm.$emit('input', 'Test')
    wrapper.find('#input-wiki-category')
      .vm.$emit('input', { id: '1', type: 'wiki-categories' })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    expect(dispatch).to.have.been.calledWith('create', {
      resource: 'wiki_pages',
      payload: {
        attributes: {
          title: 'Test'
        },
        relationships: {
          'wiki-category': {
            data: {
              id: '1',
              type: 'wiki-categories'
            }
          }
        }
      }
    })
  })
})
