import Navbar from 'components/navbar'
import MenuItem from 'components/menu-item'

describe('components/navbar.vue', () => {
  const context = {
    id: 1,
    type: 'comments',
    attributes: {
      'can-see-project-index': true,
      'can-see-wiki-index': true,
      'can-see-archive-index': true,
      'can-see-user-index': true,
      'can-see-contact-index': true,
      'can-see-organization-index': true
    }
  }
  const factory = () => {
    return createWrapper(Navbar, {
      mocks: {
        $store: {
          getters: {
            context
          },
          dispatch
        }
      },
      stubs: {
        notificationBell: true,
        routerLink: true
      }
    })
  }

  it('renders the navbar correctly', async () => {
    const wrapper = factory()

    expect(wrapper.findAllComponents(MenuItem).at(0).props()).toEqual({
      name: 'Projects',
      path: '/administration/projects',
      startsWith: '/administration/projects'
    })
    expect(wrapper.findAllComponents(MenuItem).at(1).props()).toEqual({
      name: 'Wiki',
      path: '/administration/wiki',
      startsWith: '/administration/wiki'
    })
    expect(wrapper.findAllComponents(MenuItem).at(2).props()).toEqual({
      name: 'Archive',
      path: '/administration/archive',
      startsWith: '/administration/archive'
    })
    expect(wrapper.findAllComponents(MenuItem).at(3).props()).toEqual({
      name: 'Users',
      path: '/administration/users',
      startsWith: '/administration/users'
    })
    expect(wrapper.findAllComponents(MenuItem).at(4).props()).toEqual({
      name: 'Contacts',
      path: '/administration/contacts',
      startsWith: '/administration/contacts'
    })
    expect(wrapper.findAllComponents(MenuItem).at(5).props()).toEqual({
      name: 'Admin',
      path: '/administration/admin/context',
      startsWith: '/administration/admin'
    })
  })
})
