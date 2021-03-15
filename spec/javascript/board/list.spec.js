import List from 'board/list'
import Issue from 'board/issue'
import draggable from 'vuedraggable'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('List', () => {
  const dispatch = sandbox.stub()
  const entry = sandbox.stub()
  const associatedEntries = sandbox.stub()
  const relationship = sandbox.stub()
  const factory = () => {
    return createWrapper(List, {
      propsData: {
        listId: 1
      },
      stubs: {
        draggable
      },
      mocks: {
        $store: {
          getters: {
            entry,
            associatedEntries,
            relationship
          },
          dispatch
        }
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
      entry.returns(boardList)
      associatedEntries.returns(issues)
    })

    it('contain the title', () => {
      expect(factory().html()).to.include('board list name')
    })

    it('contain the complexity', () => {
      expect(factory().html()).to.include('1.0')
    })

    it('contain the Issue element with correct issueId', () => {
      const wrapper = factory()
      expect(wrapper.findAll(Issue).at(0).props().issueId).to.be.eq(1)
      expect(wrapper.findAll(Issue).at(1).props().issueId).to.be.eq(2)
    })

    it('contain the Issue element with correct boardListId', () => {
      const wrapper = factory()
      expect(wrapper.findAll(Issue).at(0).props().boardListId).to.be.eq(1)
      expect(wrapper.findAll(Issue).at(1).props().boardListId).to.be.eq(1)
    })
  })

  describe('when the boardList is not present', () => {
    beforeEach(() => {
      entry.returns(null)
    })

    it('render nothing', () => {
      expect(factory().html()).to.empty
    })
  })
})
