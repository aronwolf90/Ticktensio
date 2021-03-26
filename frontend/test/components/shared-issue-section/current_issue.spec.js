import CurrentIssue from 'components/shared-issue-section/current_issue'

describe('CurrentIssue', () => {
  const factory = (options = {}) => {
    return createWrapper(CurrentIssue, options)
  }

  describe('with currentIssue', () => {
    const currentIssue = {
      id: 1,
      type: 'issues',
      attributes: { title: 'current issue title' },
      relationships: { 'board-list': { data: { id: 1, type: 'board-lists' } } }
    }

    it("has currentIssue's title", () => {
      const wrapper = factory({ mocks: { $store: { getters: { currentIssue } } } })

      expect(wrapper.html()).toContain('current issue title')
    })
  })
  describe('without currentIssue', () => {
    it('render nothing', () => {
      const wrapper = factory({ mocks: { $store: { getters: { currentIssue: null } } } })

      expect(wrapper.html()).toEqual('')
    })
  })
})
