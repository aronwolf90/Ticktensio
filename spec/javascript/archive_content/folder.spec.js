import Folder from 'archive_content/folder'
import Document from 'archive_content/document'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Folder', () => {
  const dispatch = sandbox.stub()
  const entry = sandbox.stub()
  const associatedEntries = sandbox.stub()
  const doc = { id: 1, attributes: { name: 'document name' } }
  const folder = { id: 1, attributes: { name: 'folder name' } }
  const childFolder = { id: 2, title: 'child folder name' }
  const factory = () => {
    return createWrapper(Folder, {
      mocks: {
        $store: {
          getters: {
            entry,
            associatedEntries
          },
          dispatch
        }
      },
      propsData: {
        folderId: 1
      }
    })
  }
  beforeEach(() => {
    entry.withArgs({ type: 'folders', id: 1 }).returns(folder)
    entry.withArgs({ type: 'folders', id: 2 }).returns(childFolder)
    entry.withArgs({ type: 'documents', id: 1 }).returns(doc)
    associatedEntries.returns([])
    associatedEntries.withArgs({ entry: folder, name: 'folders' }).returns([childFolder])
    associatedEntries.withArgs({ entry: folder, name: 'documents' }).returns([doc])
  })

  it('the name is present', () => {
    expect(factory().html()).to.include('folder name')
  })

  it('the folder icon is present', () => {
    expect(factory().html()).to.include('fa-tags')
  })

  it('eit btn is present', () => {
    expect(factory().html()).to.include('/administration/archive/folders/1/edit')
  })

  it('render the child folder', () => {
    expect(factory().find(Folder).exists()).to.be.true
  })

  it('render the document', () => {
    expect(factory().find(Document).exists()).to.be.true
  })
})
