import Document from 'archive_content/document'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Document', () => {
  const entry = sandbox.stub()
  const doc = { id: 1, attributes: { name: 'document name' } }
  const factory = () => {
    return createWrapper(Document, {
      mocks: {
        $store: {
          getters: {
            entry
          }
        }
      }
    })
  }
  beforeEach(() => {
    entry.returns(doc)
  })

  it('the name is present', () => {
    expect(factory().html()).to.include('document name')
  })

  it('the document icon is present', () => {
    expect(factory().html()).to.include('fa-file-text-o')
  })

  it('edit link is presetnt', () => {
    expect(factory().html()).to
      .include('/documents/1/edit')
  })
})
