import ContactsIndexModule from 'store/modules/contacts-index.js'

describe('store/modules/contacts-index.js', () => {
  const contact = {
    id: '1',
    type: 'contacts',
    attributes: {
      name: 'Lara Croft'
    }
  }

  it('actions.fetch', async () => {
    const dispatch = jest.fn()
    const commit = jest.fn()
    const response = {
      data: [contact],
      meta: { count: 1 }
    }

    when(dispatch)
      .calledWith('get', 'contacts', expect.anything())
      .mockResolvedValue(response)
    await ContactsIndexModule.actions.fetch({ dispatch, commit })

    expect(commit).toHaveBeenCalledWith('contacts', [contact])
  })

  it('mutations.contacts', () => {
    const state = {}

    ContactsIndexModule.mutations.contacts(state, [contact])

    expect(state).toEqual({ contactRefs: [{ id: '1', type: 'contacts' }] })
  })

  it('getters.contacts', () => {
    const state = { contactRefs: [{ id: '1', type: 'contacts' }] }
    const entry = jest.fn()

    when(entry)
      .calledWith({ id: '1', type: 'contacts' })
      .mockReturnValue(contact)

    expect(ContactsIndexModule.getters.contacts(
      state, null, null, { entry }
    )).toEqual([contact])
  })
})
