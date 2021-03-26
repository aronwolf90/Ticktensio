import List from 'components/board/list'
import Issue from 'components/board/issue'

describe('List', () => {
  const factory = () => {
    return createWrapper(List, {
      propsData: {
        listId: 1
      },
      stubs: {
        draggable: true
      }
    })
  }

  describe('when the boardList is present and his data is correct', () => {
    const issue1 = { id: 1, type: 'issues', attributes: { name: 'name1' } }
    const issue2 = { id: 2, type: 'issues', attributes: { name: 'name2' } }
    const issues = [issue1, issue2]
    const boardList = {
      id: 1,
      type: 'boardLists',
      name: 'name',
      attributes: {
        name: 'board list name',
        complexity: '1.0'
      },
      relationships: { issues: { data: issues } }
    }

    beforeEach(() => {
      entry.mockReturnValue(boardList)
      associatedEntries.mockReturnValue(issues)
    })

    it('contain the title', () => {
      expect(factory().html()).toContain('board list name')
    })

    it('contain the complexity', () => {
      expect(factory().html()).toContain('1.0')
    })

    it('contain the Issue element with correct issueId', () => {
      const wrapper = factory()
      expect(wrapper.findAllComponents(Issue).at(0).props().issueId).toEqual(1)
      expect(wrapper.findAllComponents(Issue).at(1).props().issueId).toEqual(2)
    })

    it('contain the Issue element with correct boardListId', () => {
      const wrapper = factory()
      expect(wrapper.findAllComponents(Issue).at(0).props().boardListId).toEqual(1)
      expect(wrapper.findAllComponents(Issue).at(1).props().boardListId).toEqual(1)
    })
  })

  describe('when the boardList is not present', () => {
    beforeEach(() => {
      entry.mockReturnValue(null)
    })

    it('render nothing', () => {
      expect(factory().html()).toEqual('')
    })
  })
})
