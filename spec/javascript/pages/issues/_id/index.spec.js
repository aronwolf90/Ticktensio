import IssueShow from 'pages/issues/_id/index'
import MarkdownViewer from 'markdown_viewer'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('issue/show.vue', () => {
  const dispatch = sandbox.stub()
  const entry = sandbox.stub()
  const issue = {
    id: 1,
    type: 'issues',
    attributes: { title: 'issue title', description: 'description' }
  }
  const factory = () => {
    return createWrapper(IssueShow, {
      stubs: {
        'show-btn-destroy': true
      },
      mocks: {
        $store: {
          dispatch,
          getters: {
            entry
          }
        }
      }
    })
  }

  beforeEach(() => {
    dispatch.withArgs('destroy').returns(Promise.resolve())
  })

  describe('with issue', () => {
    beforeEach(() => {
      entry.returns(issue)
    })

    it('renders correctly the component', async () => {
      const wrapper = factory()
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).to.include('issue title')
      expect(wrapper.find(MarkdownViewer).props().value).to.eq('description')
    })

    it('call visit on click on the destroy btn', async () => {
      const wrapper = factory()
      wrapper.find('show-btn-destroy-stub')
        .vm.$emit('destroy')
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$route.path)
        .to.eq('/administration/board_lists')
    })
  })

  describe('without issue', () => {
    beforeEach(() => {
      entry.returns(null)
    })

    it('render nothing', () => {
      const wrapper = factory()
      expect(wrapper.html()).to.be.empty
    })
  })
})
