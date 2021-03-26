import Document from 'components/archive-content/document'

describe('Document', () => {
  const doc = { id: 1, attributes: { name: 'document name' } }
  const factory = () => {
    return createWrapper(Document)
  }
  beforeEach(() => {
    entry.mockReturnValue(doc)
  })

  test('the name is present', () => {
    expect(factory().html()).toContain('document name')
  })

  test('the document icon is present', () => {
    expect(factory().html()).toContain('fa-file-text-o')
  })

  test('edit link is presetnt', () => {
    expect(factory().html()).toContain('/documents/1/edit')
  })
})
