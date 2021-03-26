import Folder from 'components/archive-content/folder'
import Document from 'components/archive-content/document'

describe('Folder', () => {
  const doc = { id: 1, attributes: { name: 'document name' } }
  const folder = { id: 1, attributes: { name: 'folder name' } }
  const childFolder = { id: 2, title: 'child folder name' }
  const factory = () => {
    return createWrapper(Folder, {
      propsData: {
        folderId: 1
      }
    })
  }
  beforeEach(() => {
    when(entry).calledWith({ type: 'folders', id: 1 }).mockReturnValue(folder)
    when(entry).calledWith({ type: 'folders', id: 2 }).mockReturnValue(childFolder)
    when(entry).calledWith({ type: 'documents', id: 1 }).mockReturnValue(doc)
    associatedEntries.mockReturnValue([])
    when(associatedEntries).calledWith({ entry: folder, name: 'folders' }).mockReturnValue([childFolder])
    when(associatedEntries).calledWith({ entry: folder, name: 'documents' }).mockReturnValue([doc])
  })

  test('the name is present', () => {
    expect(factory().html()).toContain('folder name')
  })

  test('the folder icon is present', () => {
    expect(factory().html()).toContain('fa-tags')
  })

  test('eit btn is present', () => {
    expect(factory().html()).toContain('/administration/archive/folders/1/edit')
  })

  test('render the child folder', () => {
    expect(factory().findComponent(Folder).exists()).toBeTruthy()
  })

  test('render the document', () => {
    expect(factory().findComponent(Document).exists()).toBeTruthy()
  })
})
