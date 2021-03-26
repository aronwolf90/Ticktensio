import PagesWikiCategoriesNew from 'pages/wiki/categories/new'

describe('pages/wiki/categories/new', () => {
  const factory = () => {
    return createWrapper(PagesWikiCategoriesNew, {
      stubs: {
        'wiki-categories-form': true
      },
      mocks: {
        $store: {
          dispatch
        }
      }
    })
  }

  it('renders the form', () => {
    const wrapper = factory()

    expect(wrapper.find('wiki-categories-form-stub').exists()).toBeTruthy()
  })

  it('calls wikiCategoriesForm/create on submit event', async () => {
    const wrapper = factory()

    when(dispatch).calledWith('wikiCategoriesForm/create').mockReturnValue(true)
    wrapper.find('wiki-categories-form-stub').vm.$emit('submit')
    await wrapper.vm.$nextTick()

    expect(dispatch).toHaveBeenCalledWith('wikiCategoriesForm/create')
    expect(wrapper.vm.$route.path).toEqual('/administration/wiki')
  })
})
