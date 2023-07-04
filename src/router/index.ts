import { createRouter, createWebHistory } from 'vue-router'

import ArrangementView from '@/pages/ArrangementView.vue'
import ArrangementsView from '@/pages/ArrangementsView.vue'
import Home from '@/pages/Home.vue'
import LocalForm from '@/pages/LocalForm.vue'

import Login from '@/pages/Login.vue'
import MyFileView from '@/pages/MyFileView.vue'
import MyRequestDetails from '@/pages/MyRequestDetails.vue'
import MyMessagesOverview from '@/pages/MyMessagesOverview.vue'
import NotFound from '@/pages/NotFound.vue'
import RemoteForm from '@/pages/RemoteForm.vue'
import FormSent from '@/pages/FormSent.vue'
import name from '@/router/name'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  // router-link-active router-link-exact-active
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path: '/',
      name: name.HOME,
      component: Home
    },
    {
      path: '/regelingen/pagina/:page',
      name: name.ARRANGEMENT_OVERVIEW_PAGE,
      component: ArrangementsView,
      props: true
    },
    {
      path: '/regelingen',
      name: name.ARRANGEMENT_OVERVIEW,
      component: ArrangementsView,
      children: [
        {
          path: ':id',
          name: name.ARRANGEMENT_DETAILS,
          component: ArrangementView,
          children: [
            {
              path: 'aanvraag-verzonden',
              name: name.FORM_SENT,
              component: FormSent
            },
            {
              path: 'aanvragen-remote',
              name: name.ARRANGEMENT_FORM_REMOTE,
              props: true,
              component: RemoteForm
            },
            {
              path: 'aanvragen-local',
              name: name.ARRANGEMENT_FORM_LOCAL,
              component: LocalForm
            }
          ]
        }
      ]
    },
    {
      path: '/mijn-dossier',
      name: name.MY_FILE_OVERVIEW,
      component: MyFileView,
      children: [
        {
          path: 'aanvragen/:id',
          name: name.MY_REQUEST_DETAILS,
          component: MyRequestDetails
        }
      ]
    },
    {
      path: '/mijn-berichten/pagina/:page',
      name: name.MY_MESSAGES_PAGE,
      component: MyMessagesOverview,
      props: true
    },
    {
      path: '/mijn-berichten',
      name: name.MY_MESSAGES,
      component: MyMessagesOverview
    },
    {
      path: '/inloggen',
      name: name.LOGIN,
      props: true,
      component: Login
    },
    {
      path: '/:catchAll(.*)',
      name: name.NOT_FOUND,
      props: true,
      component: NotFound
    }
  ]
})

export default router
