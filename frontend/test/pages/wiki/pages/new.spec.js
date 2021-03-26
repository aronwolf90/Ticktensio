import PagesWikiPagesNew from 'pages/wiki/pages/new'

describe('pages/wiki/pages/new', () => {
  const factory = () => {
    const wrapper = createWrapper(PagesWikiPagesNew, {
      attachToDocument: true
    })
    wrapper.vm.$router.push('/wiki/pages/new')
    return wrapper
  }

  it('can fill and submit the form', async () => {
    when(dispatch)
      .mockResolvedValue()
      .calledWith('createProjectStatus', expect.anything())
      .mockResolvedValue({
        data: {
          data: {
            id: '1',
            type: 'project-statuses'
          }
        }
      })
    const wrapper = factory()
    wrapper.find('#input-title')
      .vm.$emit('input', 'Test')
    wrapper.find('#input-wiki-category')
      .vm.$emit('input', { id: '1', type: 'wiki-categories' })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    expect(dispatch).toHaveBeenCalledWith('create', {
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
