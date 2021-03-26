import IssueShow from 'pages/issues/_id/index'
import MarkdownViewer from 'markdown_viewer'

describe('issue/show.vue', () => {
  const issue = {
    id: 1,
    type: 'issues',
    attributes: { title: 'issue title', description: 'description' }
  }
  const factory = () => {
    return createWrapper(IssueShow, {
      stubs: {
        'show-btn-destroy': true
      }
    })
  }

  beforeEach(() => {
    when(dispatch).calledWith('destroy', { entry: issue }).mockResolvedValue()
  })

  describe('with issue', () => {
    beforeEach(() => {
      entry.mockReturnValue(issue)
    })

    it('renders correctly the component', async () => {
      const wrapper = factory()
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toContain('issue title')
      expect(wrapper.findComponent(MarkdownViewer).props().value)
        .toEqual('description')
    })

    it('call visit on click on the destroy btn', async () => {
      const wrapper = factory()
      wrapper.find('show-btn-destroy-stub')
        .vm.$emit('destroy')
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$route.path)
        .toEqual('/administration/board_lists')
    })
  })

  describe('without issue', () => {
    beforeEach(() => {
      entry.mockReturnValue(null)
    })

    it('render nothing', () => {
      const wrapper = factory()
      expect(wrapper.html()).toEqual('')
    })
  })
})
