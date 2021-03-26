import BoardSearchSelectItem from 'components/ticket-board/search-select-item'
import SearchSelectItem from 'components/search-select-item'
import IssueExtraInformation from 'components/ticket-board/issue-extra-information'

describe('components/ticket-board/search-select-item.vue', () => {
  const factory = ({ propsData } = {}) => {
    return createWrapper(BoardSearchSelectItem, {
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        },
        ...propsData
      },
      stubs: {
        SearchSelectItem: true,
        IssueExtraInformation: true
      }
    })
  }

  beforeEach(() => {
    when(entry).calledWith({ id: '1', type: 'issues' }).mockReturnValue({
      id: '1',
      type: 'issues',
      attributes: {
        title: 'Test title'
      }
    })
  })

  it('renders the component', () => {
    const wrapper = factory({
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        }
      }
    })

    expect(wrapper.findComponent(SearchSelectItem).props().title)
      .toEqual('Test title')
    expect(wrapper.findComponent(SearchSelectItem).props().link)
      .toEqual('issues/1')
    expect(wrapper.findComponent(IssueExtraInformation).props().issueRef)
      .toEqual({ id: '1', type: 'issues' })
  })

  it('renders the component', () => {
    const wrapper = factory({
      propsData: {
        issueRef: null
      }
    })

    expect(wrapper.html()).toEqual('')
  })
})
