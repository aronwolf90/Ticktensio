import PagesArchiveFoldersNew from 'pages/archive/folders/new'

describe('pages/archive/folders/new', () => {
  const factory = () => {
    return createWrapper(PagesArchiveFoldersNew, {
      stubs: {
        'archive-folders-form': true
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

    expect(wrapper.find('archive-folders-form-stub').exists()).toBeTruthy()
  })

  it('calls foldersForm/create on submit event', async () => {
    const wrapper = factory()

    when(dispatch).calledWith('foldersForm/create').mockReturnValue(true)
    wrapper.find('archive-folders-form-stub').vm.$emit('submit')
    await wrapper.vm.$nextTick()

    expect(dispatch).toHaveBeenCalledWith('foldersForm/create')
    expect(wrapper.vm.$route.path).toEqual('/administration/archive')
  })
})
