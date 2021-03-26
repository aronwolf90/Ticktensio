import MarkdownViewer from 'markdown_viewer'

describe('MarkdownViewer', () => {
  const factory = () => {
    return createWrapper(MarkdownViewer, {
      propsData: { value: 'test' }
    })
  }

  it("has currentIssue's title", () => {
    expect(factory().html()).toContain('test')
  })
})
