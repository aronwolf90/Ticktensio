import FoldersForm from 'store/modules/folders-form.js'

describe('store/modules/folders-form.js', () => {
  it('mutations.clear', () => {
    const state = {}
    FoldersForm.mutations.clear(state)

    expect(state).toEqual({
      form: {
        attributes: {
          name: null
        },
        relationships: {
          folder: {
            data: null
          }
        }
      }
    })
  })

  it('mutations.formName', () => {
    const state = { form: { attributes: { name: null } } }
    FoldersForm.mutations.formName(state, 'Test name')

    expect(state.form.attributes.name).toEqual('Test name')
  })

  it('mutations.formFolderRef', () => {
    const state = { form: { relationships: { folder: { data: null } } } }
    FoldersForm.mutations.formFolderRef(state, { id: '1', type: 'folders' })

    expect(state.form.relationships.folder.data).toEqual({
      id: '1',
      type: 'folders'
    })
  })

  it('mutations.errors', () => {
    const state = { errors: [] }
    FoldersForm.mutations.errors(state, ['error'])

    expect(state.errors).toEqual(['error'])
  })

  it('mutations.folderId', () => {
    const state = { folderId: null }
    FoldersForm.mutations.folderId(state, '1')

    expect(state.folderId).toEqual('1')
  })

  it('mutations.folder', () => {
    const folder = {
      id: '1',
      type: 'folders'
    }
    const state = { folderRef: null }
    FoldersForm.mutations.folder(state, { id: '1', type: 'folders' })

    expect(state.folderRef).toEqual(folder)
  })

  it('getters.formName', () => {
    const state = { form: { attributes: { name: 'Test name' } } }

    expect(FoldersForm.getters.formName(state)).toEqual('Test name')
  })

  it('getters.formFolderRef', () => {
    const state = {
      form: {
        relationships: { folder: { data: { id: '1', type: 'folders' } } }
      }
    }

    expect(FoldersForm.getters.formFolderRef(state))
      .toEqual({ id: '1', type: 'folders' })
  })

  it('getters.folderId', () => {
    const state = { folderId: '1' }

    expect(FoldersForm.getters.folderId(state))
      .toEqual('1')
  })

  it('getters.folder', () => {
    const folder = {
      id: '1',
      type: 'folders'
    }
    const entry = jest.fn()
    when(entry)
      .calledWith({ id: '1', type: 'folders' })
      .mockReturnValue(folder)

    expect(FoldersForm.getters.folder(
      { folderRef: { id: '1', type: 'folders' } },
      null,
      null,
      { entry }
    )).toEqual(folder)
  })

  it('actions.initializeNewForm', async () => {
    const dispatch = jest.fn()
    const commit = jest.fn()
    await FoldersForm.actions.initializeNewForm({ dispatch, commit })

    expect(commit).toHaveBeenCalledWith('clear')
    expect(dispatch).toHaveBeenCalledWith('get', 'folders', { root: true })
  })

  it('actions.initializeEditForm', async () => {
    const folder = {
      id: '1',
      type: 'folders',
      attributes: {
        name: 'Test name'
      },
      relationships: {
        folder: {
          data: {
            id: '2',
            type: 'folders'
          }
        }
      }
    }
    const dispatch = jest.fn()
    const commit = jest.fn()

    when(dispatch)
      .calledWith('get', 'folders/1', { root: true })
      .mockResolvedValue({ data: folder })

    await FoldersForm.actions.initializeEditForm({ dispatch, commit }, '1')

    expect(commit).toHaveBeenCalledWith('clear')
    expect(commit).toHaveBeenCalledWith('folder', folder)
    expect(commit).toHaveBeenCalledWith('formName', 'Test name')
    expect(commit).toHaveBeenCalledWith('formFolderRef',
      { id: '2', type: 'folders' })
  })

  it('actions.create returns true when dispatch.create succeed', async () => {
    const dispatch = jest.fn()
    const state = { form: { attributes: { name: 'Test name' } } }

    dispatch.mockResolvedValue()
    expect(await FoldersForm.actions.create({ dispatch, state })).toEqual(true)

    expect(dispatch).toHaveBeenCalledWith('create', {
      resource: 'folders',
      payload: state.form
    }, { root: true })
  })

  it('actions.create returns false when dispatch.create fails', async () => {
    const dispatch = jest.fn()
    const commit = jest.fn()
    const state = { form: { attributes: { name: 'Test name' } } }

    // eslint-disable-next-line prefer-promise-reject-errors
    dispatch
      .mockRejectedValue({ data: { errors: ['error'] } })
    expect(await FoldersForm.actions.create({ dispatch, state, commit }))
      .toEqual(false)

    expect(commit).toHaveBeenCalledWith('errors', ['error'])
    expect(dispatch).toHaveBeenCalledWith('create', {
      resource: 'folders',
      payload: state.form
    }, { root: true })
  })

  it('actions.update returns true when dispatch.create succeed', async () => {
    const folder = {
      id: '1',
      type: 'folders'
    }
    const dispatch = jest.fn()
    const state = { form: { attributes: { name: 'Test name' } } }
    const getters = { folderId: 1, folder }

    dispatch.mockResolvedValue()

    expect(await FoldersForm.actions.update({ dispatch, state, getters }))
      .toEqual(true)

    expect(dispatch).toHaveBeenCalledWith('update', {
      entry: folder,
      payload: state.form
    }, { root: true })
  })
})
