import ProjectsDocumentsNew from 'pages/projects/_id/documents/new'

describe('pages/projects/_id/documents/new.vue', () => {
  const folder = {
    id: 1,
    type: 'folders',
    attributes: {
      name: 'Test'
    }
  }

  it('calls createDocument when submit is clicked', async () => {
    when(dispatch)
      .mockResolvedValue()
      .calledWith('getProjectFolder', expect.anything())
      .mockResolvedValue(folder)

    const wrapper = createWrapper(ProjectsDocumentsNew, {
      attachToDocument: true
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    wrapper.find('[type="submit"]').trigger('click')
    expect(dispatch).toHaveBeenCalledWith('createDocument', expect.anything())
  })
})
