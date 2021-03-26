import SearchSelect from 'components/board/search-select'

describe('SearchSelect', () => {
  it('show issue1', async () => {
    const wrapper = createWrapper(SearchSelect, {
      stubs: {
        'search-select-item': true
      },
      data () {
        return {
          issueRefs: [{ id: 1, type: 'issues' }],
          focused: true
        }
      },
      mocks: {
        $store: {
          getters: {
            entry () {
              return {
                id: 1,
                type: 'issues',
                attributes: { title: 'issue1' },
                relationships: {
                  'board-list': { data: { id: 1, type: 'board-lits' } }
                }
              }
            }
          },
          dispatch () {
            return Promise.resolve({ data: [{ id: 1, type: 'issues' }] })
          }
        }
      }
    })

    expect(wrapper.find('search-select-item-stub').exists()).toBeTruthy()
  })
})
