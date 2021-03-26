import WikiCategoriesForm from 'components/wiki/categories/form'

describe('components/wiki/categories/form.vue', () => {
  const wikiCategory = {
    id: '1',
    type: 'wiki-categories',
    relationships: {
      'wiki-category': {
        data: {
          id: '1',
          type: 'wiki-categories'
        }
      }
    }
  }
  const factory = () => {
    return createWrapper(WikiCategoriesForm, {
      stubs: {
        'form-inputs-text': true,
        'form-inputs-wiki-category-select': true
      },
      mocks: {
        $store: {
          getters: {
            folders: [wikiCategory],
            'wikiCategoriesForm/formWikiCategoryRef': {
              id: '1',
              type: 'wiki-categories'
            },
            'wikiCategoriesForm/formTitle': 'Test title',
            'wikiCategoriesForm/errors': []
          }
        }
      },
      slots: {
        default: 'Slot content'
      }
    })
  }

  it('is correctly rendered and syncronize changes back to store', () => {
    const wrapper = factory()

    expect(wrapper.find('#title-input').props()).toEqual({
      id: 'title-input',
      errorPath: 'attributes/title',
      errors: [],
      label: 'Title',
      value: 'Test title',
      placeholder: undefined
    })
    expect(wrapper.find('#wiki-category-input').props()).toEqual({
      id: 'wiki-category-input',
      errorPath: 'relationships/wiki-category',
      errors: [],
      label: 'Category',
      value: { id: '1', type: 'wiki-categories' }
    })
    expect(wrapper.html()).toContain('Slot content')

    wrapper.find('#title-input').vm.$emit('input', 'New test name')
    wrapper.find('#wiki-category-input').vm.$emit('input',
      { id: '1', type: 'wiki-categories' })

    expect(commit)
      .toHaveBeenCalledWith('wikiCategoriesForm/formTitle'
        , 'New test name')
    expect(commit)
      .toHaveBeenCalledWith('wikiCategoriesForm/formWikiCategoryRef',
        { id: '1', type: 'wiki-categories' })
  })
})
