import Issue from 'components/board/issue'

describe('Issue', () => {
  const factory = () => {
    return createWrapper(Issue, {
      propsData: {
        issueId: 1,
        boardListId: 1
      },
      stubs: {
        draggable: true,
        IssuesRecordSection: true
      }
    })
  }

  it('include show link', () => {
    const wrapper = factory()
    expect(wrapper.html()).toContain('issues/1')
  })
})
