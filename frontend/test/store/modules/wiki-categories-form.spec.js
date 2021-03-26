import WikiCategoriesForm from 'store/modules/wiki-categories-form.js'

describe('store/modules/wiki-categories-form.js', () => {
  it('mutations.clear', () => {
    const state = {}
    WikiCategoriesForm.mutations.clear(state)

    expect(state).toEqual({
      form: {
        attributes: {
          title: null
        },
        relationships: {
          'wiki-category': {
            data: null
          }
        }
      },
      errors: []
    })
  })

  it('mutations.formtitle', () => {
    const state = { form: { attributes: { title: null } } }
    WikiCategoriesForm.mutations.formTitle(state, 'Test title')

    expect(state.form.attributes.title).toEqual('Test title')
  })

  it('mutations.formWikiCategoryRef', () => {
    const state = {
      form: {
        relationships: { 'wiki-category': { data: null } }
      }
    }
    WikiCategoriesForm.mutations.formWikiCategoryRef(state,
      { id: '1', type: 'wiki-categories' })

    expect(state.form.relationships['wiki-category'].data)
      .toEqual({ id: '1', type: 'wiki-categories' })
  })

  it('mutations.errors', () => {
    const state = { errors: [] }
    WikiCategoriesForm.mutations.errors(state, ['error'])

    expect(state.errors).toEqual(['error'])
  })

  it('mutations.wikiCategoryId', () => {
    const state = { folderId: null }
    WikiCategoriesForm.mutations.wikiCategoryId(state, '1')

    expect(state.wikiCategoryId).toEqual('1')
  })

  it('mutations.wikiCategory', () => {
    const wikiCategory = {
      id: '1',
      type: 'wiki-categories'
    }
    const state = { wikiCategoryRef: null }
    WikiCategoriesForm.mutations.wikiCategory(state,
      { id: '1', type: 'wiki-categories' })

    expect(state.wikiCategoryRef).toEqual(wikiCategory)
  })

  it('getters.formTitle', () => {
    const state = { form: { attributes: { title: 'Test title' } } }

    expect(WikiCategoriesForm.getters.formTitle(state))
      .toEqual('Test title')
  })

  it('getters.formwikiCategoryRef', () => {
    const state = {
      form: {
        relationships: { 'wiki-category': { data: { id: '1', type: 'wiki-categories' } } }
      }
    }

    expect(WikiCategoriesForm.getters.formWikiCategoryRef(state))
      .toEqual({ id: '1', type: 'wiki-categories' })
  })

  it('getters.wikiCategoryId', () => {
    const state = { wikiCategoryId: '1' }

    expect(WikiCategoriesForm.getters.wikiCategoryId(state))
      .toEqual('1')
  })

  it('getters.wikiCategory', () => {
    const wikiCategory = {
      id: '1',
      type: 'wiki-categories'
    }
    when(entry).calledWith({ id: '1', type: 'wiki-categories' })
      .mockReturnValue(wikiCategory)

    expect(WikiCategoriesForm.getters.wikiCategory(
      { wikiCategoryRef: { id: '1', type: 'wiki-categories' } },
      null,
      null,
      { entry }
    )).toEqual(wikiCategory)
  })

  it('actions.initializeNewForm', async () => {
    await WikiCategoriesForm.actions.initializeNewForm({ dispatch, commit })

    expect(commit).toHaveBeenCalledWith('clear')
    expect(dispatch).toHaveBeenCalledWith('get',
      'wiki_categories', { root: true })
  })

  it('actions.initializeEditForm', async () => {
    const wikiCategory = {
      id: '1',
      type: 'wiki-categories',
      attributes: {
        title: 'Test title'
      },
      relationships: {
        'wiki-category': {
          data: {
            id: '2',
            type: 'wiki-categories'
          }
        }
      }
    }

    when(dispatch).calledWith('get', 'wiki_categories/1', { root: true })
      .mockResolvedValue({ data: wikiCategory })

    await WikiCategoriesForm.actions.initializeEditForm({
      dispatch,
      commit
    }, '1')

    expect(commit).toHaveBeenCalledWith('clear')
    expect(commit).toHaveBeenCalledWith('wikiCategory', wikiCategory)
    expect(commit).toHaveBeenCalledWith('formTitle', 'Test title')
    expect(commit).toHaveBeenCalledWith('formWikiCategoryRef',
      { id: '2', type: 'wiki-categories' })
  })

  it('actions.create returns true when dispatch.create succeed', async () => {
    const state = { form: { attributes: { name: 'Test title' } } }

    dispatch.mockResolvedValue()
    expect(await WikiCategoriesForm.actions.create({ dispatch, state }))
      .toEqual(true)

    expect(dispatch).toHaveBeenCalledWith('create', {
      resource: 'wiki_categories',
      payload: state.form
    }, { root: true })
  })

  it('actions.create returns false when dispatch.create fails', async () => {
    const state = { form: { attributes: { name: 'Test name' } } }

    // eslint-disable-next-line prefer-promise-reject-errors
    dispatch.mockRejectedValue({ data: { errors: ['error'] } })
    expect(await WikiCategoriesForm.actions.create({ dispatch, state, commit }))
      .toEqual(false)

    expect(commit).toHaveBeenCalledWith('errors', ['error'])
    expect(dispatch).toHaveBeenCalledWith('create', {
      resource: 'wiki_categories',
      payload: state.form
    }, { root: true })
  })

  it('actions.update returns true when dispatch.create succeed', async () => {
    const wikiCategory = {
      id: '1',
      type: 'wiki-categories'
    }
    const state = { form: { attributes: { name: 'Test name' } } }
    const getters = { wikiCategoryId: 1, wikiCategory }

    dispatch.mockResolvedValue()

    expect(await WikiCategoriesForm.actions
      .update({ dispatch, state, getters })).toEqual(true)

    expect(dispatch).toHaveBeenCalledWith('update', {
      entry: wikiCategory,
      payload: state.form
    }, { root: true })
  })
})
