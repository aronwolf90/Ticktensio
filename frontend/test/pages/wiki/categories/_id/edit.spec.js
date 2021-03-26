import PagesWikiCategoriesIdEdit from 'pages/wiki/categories/_id/edit'

describe('pages/wiki/categories/_id/edit', () => {
  const wikiCategory = { id: '1', type: 'wiki-categories' }
  const factory = () => {
    return createWrapper(PagesWikiCategoriesIdEdit, {
      stubs: {
        'wiki-categories-form': true,
        'form-btn-destroy': true
      },
      mocks: {
        $store: {
          getters: {
            'wikiCategoriesForm/wikiCategory': wikiCategory
          }
        }
      }
    })
  }

  it('renders the form', () => {
    const wrapper = factory()

    expect(wrapper.find('wiki-categories-form-stub').exists()).toBeTruthy()
  })

  it('calls foldersForm/create on submit event', async () => {
    const wrapper = factory()

    when(dispatch).calledWith('wikiCategoriesForm/update').mockReturnValue(true)
    wrapper.find('wiki-categories-form-stub').vm.$emit('submit')
    await wrapper.vm.$nextTick()

    expect(dispatch).toHaveBeenCalledWith('wikiCategoriesForm/update')
    expect(wrapper.vm.$route.path).toEqual('/administration/wiki')
  })
})
