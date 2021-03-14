import Issue from 'board/issue'
import IssuesRecordSection from 'components/issues-record-section'
import draggable from 'vuedraggable'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Issue', () => {
  const entry = sandbox.stub()
  const relationship = sandbox.stub()
  const dispatch = sandbox.stub()
  const factory = () => {
    return createWrapper(Issue, {
      propsData: {
        issueId: 1,
        boardListId: 1
      },
      stubs: {
        draggable,
        IssuesRecordSection
      },
      mocks: {
        $store: {
          getters: {
            entry,
            relationship
          },
          dispatch
        }
      }
    })
  }

  it('include show link', () => {
    const wrapper = factory()
    expect(wrapper.html()).to.include('issues/1')
  })
})
