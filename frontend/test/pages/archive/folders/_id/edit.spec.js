import PagesArchiveFoldersEdit from 'pages/archive/folders/_id/edit'

describe('pages/archive/folders/_id/edit', () => {
  const folder = { id: '1', type: 'folders' }
  const factory = () => {
    return createWrapper(PagesArchiveFoldersEdit, {
      stubs: {
        'archive-folders-form': true,
        'form-btn-destroy': true
      },
      mocks: {
        $store: {
          getters: {
            'foldersForm/folder': folder
          }
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

    when(dispatch).calledWith('foldersForm/update').mockReturnValue(true)
    wrapper.find('archive-folders-form-stub').vm.$emit('submit')
    await wrapper.vm.$nextTick()

    expect(dispatch).toHaveBeenCalledWith('foldersForm/update')
    expect(wrapper.vm.$route.path).toEqual('/administration/archive')
  })
})
