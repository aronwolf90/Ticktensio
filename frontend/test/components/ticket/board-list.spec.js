import TicketBoardList from 'components/ticket/board-list'

describe('components/ticket/board-list.vue', () => {
  const issue = {
    id: '1',
    type: 'issues',
    relationships: {
      'board-list': {
        id: '1',
        type: 'board-lists'
      }
    }
  }
  const boardList = {
    id: '1',
    type: 'board-lists',
    attributes: {
      name: 'In progress'
    }
  }

  const factory = () => {
    return createWrapper(TicketBoardList, {
      stubs: {
        'right-aside-select': true
      },
      propsData: {
        issueRef: {
          id: '1',
          type: 'issues'
        }
      },
      mocks: {
        $store: {
          getters: {
            'issuesShow/boardLists': [boardList]
          }
        }
      }
    })
  }

  it('renders the component correctly', () => {
    when(entry).calledWith({ id: '1', type: 'issues' }).mockReturnValue(issue)
    when(relationship).calledWith(issue, 'board-list').mockReturnValue(boardList)
    const wrapper = factory()

    expect(wrapper.find('right-aside-select-stub').props()).toEqual({
      label: 'Board list',
      item: {
        text: 'In progress',
        value: { id: '1', type: 'board-lists' }
      },
      options: [
        {
          text: 'In progress',
          value: {
            id: '1',
            type: 'board-lists'
          }
        }
      ]
    })
  })

  it('calls issuesShow/updateBoardList correctly when select is emited', () => {
    when(entry).calledWith({ id: '1', type: 'issues' }).mockReturnValue(issue)
    when(entry).calledWith({ id: '1', type: 'board-lists' })
      .mockReturnValue(boardList)
    when(relationship).calledWith(issue, 'board-list')
      .mockReturnValue(boardList)
    const wrapper = factory()

    const eventData = {
      text: 'In progress',
      value: { id: '1', type: 'board-lists' }
    }
    wrapper.find('right-aside-select-stub').vm.$emit('select', eventData)

    expect(dispatch).toHaveBeenCalledWith('issuesShow/updateBoardList', boardList)
  })

  it('does not render the component when created-by is not present', () => {
    when(entry).calledWith({ id: '1', type: 'issues' }).mockReturnValue(issue)
    when(relationship).calledWith(issue, 'board-list').mockReturnValue(null)
    const wrapper = factory()

    expect(wrapper.html()).toEqual('')
  })
})
