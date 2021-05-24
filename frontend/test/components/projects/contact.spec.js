import Contact from 'components/projects/contact'
import DetailsStringInput from 'components/right-aside/string-input'

describe('components/projects/contact.vue', () => {
  const contactRef = { id: 1, type: 'contacts' }
  const contact = {
    id: 1,
    type: 'contacts',
    attributes: {
      name: 'Test'
    }
  }

  beforeEach(() => {
    entry.mockReturnValue(contact)
    dispatch.mockResolvedValue()
  })

  const factory = () => {
    return createWrapper(Contact, {
      mocks: {
        $store: {
          getters: {
            'projectsShow/contact': contactRef,
            'projectsShow/contacts': [contactRef],
            'projectsShow/contactIdValue': { id: 1, type: 'contacts' },
            'projectsShow/contactIdEditMode': false,
            'projectsShow/contactNameValue': 'project',
            'projectsShow/contactNameEditMode': false,
            'projectsShow/contactTelephoneNumberValue': '+49 821 598-1111',
            'projectsShow/contactTelephoneNumberEditMode': false,
            'projectsShow/contactEmailValue': 'aron.wolf@test.com',
            'projectsShow/contactEmailEditMode': false
          }
        }
      },
      stubs: {
        'right-aside-select-header-input': true,
        'details-string-input': true
      }
    })
  }

  describe('header', () => {
    it('render header', () => {
      const wrapper = factory()
      const header = wrapper.find('right-aside-select-header-input-stub')

      header.vm.$emit('search', 'test', () => {})

      expect(header.props().text)
        .toEqual('Contact')
      expect(header.props().options)
        .toEqual([{ id: 1, type: 'contacts' }])
      expect(header.props().getOptionLabel({ id: 1, type: 'contacts' }))
        .toEqual('Test')
      expect(dispatch)
        .toHaveBeenCalledWith('projectsShow/searchForContact', 'test')
    })
  })

  describe('telephone', () => {
    it('pass telephone value to component', () => {
      const wrapper = factory()
      const detailsStringInput =
        wrapper.findAllComponents(DetailsStringInput).at(1)

      expect(detailsStringInput.props().value)
        .toEqual('+49 821 598-1111')
    })

    it('handle submit', async () => {
      const wrapper = factory()
      const detailsStringInput =
        wrapper.findAllComponents(DetailsStringInput).at(1)

      detailsStringInput.vm.$emit('submit')
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(detailsStringInput.vm.editMode).toEqual(false)
      expect(dispatch).toHaveBeenCalledWith('projectsShow/updateContactAttributes', {
        telephone: '+49 821 598-1111'
      })
    })
  })

  describe('email', () => {
    it('pass email value to component', () => {
      const wrapper = factory()
      const detailsStringInput =
        wrapper.findAllComponents(DetailsStringInput).at(2)

      expect(detailsStringInput.vm.value)
        .toEqual('aron.wolf@test.com')
    })

    it('handle submit', async () => {
      const wrapper = factory()
      const detailsStringInput =
        wrapper.findAllComponents(DetailsStringInput).at(2)

      detailsStringInput.vm.$emit('submit')
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(detailsStringInput.vm.editMode).toEqual(false)
      expect(dispatch).toHaveBeenCalledWith(
        'projectsShow/updateContactAttributes', {
          email: 'aron.wolf@test.com'
        }
      )
    })
  })
})
