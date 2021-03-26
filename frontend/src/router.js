import Router from 'vue-router'
import RailsPage from 'components/rails-page'
import store from 'store'
import Cookies from 'js-cookie'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/administration',
      component: RailsPage,
      meta: { aside: 'global', path: '/administration/dashboard' }
    },
    {
      path: '/administration/board_lists',
      component: () => import('pages/board-lists/index'),
      meta: { aside: 'global' }
    },
    {
      path: '/administration/board_lists/new',
      component: () => import('pages/board-lists/new'),
      meta: { aside: 'global' }
    },
    {
      path: '/administration/board_lists/:id/edit',
      component: () => import('pages/board-lists/edit'),
      props: true,
      meta: { aside: 'global' }
    },
    {
      path: '/administration/calendar',
      component: () => import('pages/calendars/index'),
      meta: { aside: 'global' }
    },
    {
      path: '/administration/attendances',
      component: () => import('pages/attendances/index'),
      meta: { aside: 'global' }
    },
    {
      path: '/administration/projects',
      component: () => import('pages/projects/index'),
      meta: { aside: 'projects' }
    },
    {
      path: '/administration/projects/new',
      component: () => import('pages/projects/new'),
      meta: { aside: 'projects' }
    },
    {
      path: '/administration/projects/:id',
      component: () => import('pages/projects/_id'),
      props: true,
      meta: { aside: 'projects-detail' },
      children: [
        {
          path: '',
          component: () => import('pages/projects/_id/index'),
          props: true,
          meta: { aside: 'projects-detail' }
        },
        {
          path: 'edit',
          component: () => import('pages/projects/_id/edit'),
          props: true,
          meta: { aside: 'projects-detail' }
        }
      ]
    },
    {
      path: '/administration/projects/:id/records',
      component: () => import('pages/projects/_id/records/index'),
      props: true,
      meta: { aside: 'projects-detail' }
    },
    {
      path: '/administration/projects/:projectId/documents',
      component: () => import('pages/projects/_id/documents/index'),
      props: true,
      meta: { aside: 'projects-detail' }
    },
    {
      path: '/administration/projects/:projectId/documents/new',
      component: () => import('pages/projects/_id/documents/new'),
      props: true,
      meta: { aside: 'projects-detail' }
    },
    {
      path: '/administration/projects/:projectId/documents/:id/edit',
      component: () => import('pages/projects/_id/documents/_id/edit'),
      props: true,
      meta: { aside: 'projects-detail' }
    },
    {
      path: '/administration/projects/:projectId/board_lists',
      component: () => import('pages/projects/_id/board-lists'),
      props: true,
      meta: { aside: 'projects-detail' }
    },
    {
      path: '/administration/projects/:projectId/board_lists/new',
      component: () => import('pages/board-lists/new'),
      meta: { aside: 'projects-detail' }
    },
    {
      path: '/administration/projects/:projectId/board_lists/:boardListId/issues/new',
      component: () => import('pages/board-lists/issues/new'),
      props: true,
      meta: { aside: 'projects-detail' }
    },
    {
      path: '/administration/projects/:projectId/board_lists/:id/edit',
      component: () => import('pages/board-lists/edit'),
      props: true,
      meta: { aside: 'projects-detail' }
    },
    {
      path: '/administration/projects/:projectId/issues/:id',
      component: () => import('pages/issues/_id'),
      props: true,
      children: [
        {
          path: '',
          component: () => import('pages/issues/_id/index'),
          meta: { aside: 'projects-detail' }
        },
        {
          path: 'edit',
          component: () => import('pages/issues/_id/edit'),
          meta: { aside: 'projects-detail' }
        }
      ]
    },
    {
      path: '/administration/records',
      component: () => import('pages/records/index'),
      props: true,
      meta: { aside: 'global' }
    },
    {
      path: '/administration/records/new',
      component: () => import('pages/records/new'),
      props: true,
      meta: { aside: 'global' }
    },
    {
      path: '/administration/records/:id/edit',
      component: () => import('pages/records/edit'),
      props: true,
      meta: { aside: 'global' }
    },
    {
      path: '/administration/project_statuses/new',
      component: () => import('pages/project-statuses/new'),
      meta: { aside: 'projects' }
    },
    {
      path: '/administration/project_statuses/:id',
      component: () => import('pages/project-statuses/_id'),
      props: true,
      meta: { aside: 'projects' }
    },
    {
      path: '/administration/project_statuses/:id/edit',
      component: () => import('pages/project-statuses/_id/edit'),
      props: true,
      meta: { aside: 'projects' }
    },
    {
      path: '/administration/project_statuses/:projectStatusId/project_board_lists/new',
      component: () => import('pages/project-statuses/_id/project-board-lists/new'),
      props: true,
      meta: { aside: 'projects' }
    },
    {
      path: '/administration/project_board_lists/:id/edit',
      component: () => import('pages/project-board-lists/_id/edit'),
      props: true,
      meta: { aside: 'projects' }
    },
    {
      path: '/administration/board_lists/:id/edit',
      component: RailsPage,
      meta: { aside: 'global' }
    },
    {
      path: '/administration/board_lists/:boardListId/issues/new',
      component: () => import('pages/board-lists/issues/new'),
      props: true,
      meta: { aside: 'global' }
    },
    {
      path: '/administration/issues/:id',
      component: () => import('pages/issues/_id'),
      props: true,
      children: [
        {
          path: '',
          component: () => import('pages/issues/_id/index'),
          meta: { aside: 'global' }
        },
        {
          path: 'edit',
          component: () => import('pages/issues/_id/edit'),
          meta: { aside: 'global' }
        }
      ]
    },
    {
      path: '/administration/wiki',
      component: () => import('pages/wiki/index'),
      props: true,
      meta: { aside: 'wiki' }
    },
    {
      path: '/administration/wiki/pages/new',
      component: () => import('pages/wiki/pages/new'),
      props: true,
      meta: { aside: 'wiki' }
    },
    {
      path: '/administration/wiki/pages/:wikiPageId',
      component: () => import('pages/wiki/pages/_id'),
      props: true,
      meta: { aside: 'wiki' },
      children: [
        {
          path: '',
          component: () => import('pages/wiki/pages/_id/index'),
          meta: { aside: 'global' }
        },
        {
          path: 'edit',
          component: () => import('pages/wiki/pages/_id/edit'),
          meta: { aside: 'global' }
        }
      ]
    },
    {
      path: '/administration/wiki/categories/new',
      component: () => import('pages/wiki/categories/new'),
      props: true,
      meta: { aside: 'wiki' }
    },
    {
      path: '/administration/wiki/categories/:id/edit',
      component: () => import('pages/wiki/categories/_id/edit'),
      props: true,
      meta: { aside: 'wiki' }
    },
    {
      path: '/administration/archive',
      component: () => import('pages/archive/index'),
      props: true,
      meta: { aside: 'archive' }
    },
    {
      path: '/administration/archive/folders/new',
      component: () => import('pages/archive/folders/new'),
      props: true,
      meta: { aside: 'archive' }
    },
    {
      path: '/administration/archive/folders/:id/edit',
      component: () => import('pages/archive/folders/_id/edit'),
      props: true,
      meta: { aside: 'archive' }
    },
    {
      path: '/administration/archive/documents/new',
      component: () => import('pages/archive/documents/new'),
      props: true,
      meta: { aside: 'archive' }
    },
    {
      path: '/administration/archive/documents/:documentId/edit',
      component: () => import('pages/archive/documents/_id/edit'),
      props: true,
      meta: { aside: 'archive' }
    },
    {
      path: '/administration/users',
      component: () => import('pages/users/index'),
      props: true,
      meta: { aside: 'users' }
    },
    {
      path: '/administration/users/new',
      component: () => import('pages/users/new'),
      props: true,
      meta: { aside: 'users' }
    },
    {
      path: '/administration/contacts',
      component: () => import('pages/contacts/index'),
      props: true,
      meta: { aside: 'contacts' }
    },
    {
      path: '/administration/contacts/new',
      component: () => import('pages/contacts/new'),
      props: true,
      meta: { aside: 'contacts' }
    },
    {
      path: '/administration/contacts/:contactId',
      component: () => import('pages/contacts/_id'),
      props: true,
      meta: { aside: 'contacts' }
    },
    {
      path: '/administration/contacts/:contactId/edit',
      component: () => import('pages/contacts/_id/edit'),
      props: true,
      meta: { aside: 'contacts' }
    },
    {
      path: '/administration/admin/context',
      component: () => import('pages/admin/context/edit'),
      props: true,
      meta: { aside: 'admin' }
    },
    {
      path: '/administration/admin/payments',
      component: () => import('pages/admin/payments/index'),
      props: true,
      meta: { aside: 'admin' }
    },
    {
      path: '/administration/users/:id',
      component: () => import('pages/users/_id/edit'),
      props: true,
      meta: { aside: 'user-detail' }
    },
    {
      path: '/administration/users/:userId/configuration/edit',
      component: () => import('pages/users/configuration/edit'),
      props: true,
      meta: { aside: 'user-detail' }
    },
    {
      path: '/administration/users/:userId/records',
      component: () => import('pages/users/_id/records'),
      props: true,
      meta: { aside: 'user-detail' }
    },
    {
      path: '*',
      meta: { layout: 'none' },
      component: () => import('pages/404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('clearCalledUrls')
  store.commit('setAside', to.meta.aside)
  if (to.path !== from.path && from.path !== '/') {
    store.commit('setPrevPath', from.path)
  }
  toggleAsideExpanded(false) /* eslint-disable-line no-undef */
  $('.navbar-collapse').collapse('hide') /* eslint-disable-line no-undef */

  if (!Cookies.get('signed_in')) {
    location.replace('/users/sign_in')
  } else {
    next()
  }
})

export default router
