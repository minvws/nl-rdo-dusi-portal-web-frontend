import { createRouter, createWebHistory } from 'vue-router'

import ArrangementsView from '@/pages/ArrangementsView.vue'
import ArrangementView from '@/pages/ArrangementView.vue'
import FormSent from '@/pages/FormSent.vue'
import LandingPage from '@/pages/LandingPage.vue'
import LocalForm from '@/pages/LocalForm.vue'
import LoginPage from '@/pages/LoginPage.vue'
import MyFileView from '@/pages/MyFileView.vue'
import MyMessagesOverview from '@/pages/MyMessagesOverview.vue'
import MyRequestDetails from '@/pages/MyRequestDetails.vue'
import NotFound from '@/pages/NotFound.vue'
import RemoteForm from '@/pages/RemoteForm.vue'

import {
  ARRANGEMENT_DETAILS,
  ARRANGEMENT_FORM_LOCAL,
  ARRANGEMENT_FORM_REMOTE,
  ARRANGEMENT_OVERVIEW,
  ARRANGEMENT_OVERVIEW_PAGE,
  FORM_SENT,
  HOME,
  LOGIN,
  MY_FILE_OVERVIEW,
  MY_MESSAGES,
  MY_MESSAGES_PAGE,
  MY_REQUEST_DETAILS,
  NOT_FOUND
} from '@/router/names'

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
      component: LandingPage
    },
    {
      path: '/regelingen/pagina/:page',
      name: ARRANGEMENT_OVERVIEW_PAGE,
      component: ArrangementsView,
      props: true
    },
    {
      path: '/regelingen',
      name: ARRANGEMENT_OVERVIEW,
      component: ArrangementsView,
      children: [
        {
          path: ':id',
          name: ARRANGEMENT_DETAILS,
          component: ArrangementView,
          children: [
            {
              path: 'aanvraag-verzonden',
              name: FORM_SENT,
              component: FormSent
            },
            {
              path: 'aanvragen-remote',
              name: ARRANGEMENT_FORM_REMOTE,
              props: true,
              component: RemoteForm
            },
            {
              path: 'aanvragen-local',
              name: ARRANGEMENT_FORM_LOCAL,
              component: LocalForm
            }
          ]
        }
      ]
    },
    {
      path: '/mijn-dossier',
      name: MY_FILE_OVERVIEW,
      component: MyFileView,
      children: [
        {
          path: 'aanvragen/:id',
          name: MY_REQUEST_DETAILS,
          component: MyRequestDetails
        }
      ]
    },
    {
      path: '/mijn-berichten/pagina/:page',
      name: MY_MESSAGES_PAGE,
      component: MyMessagesOverview,
      props: true
    },
    {
      path: '/mijn-berichten',
      name: MY_MESSAGES,
      component: MyMessagesOverview
    },
    {
      path: '/inloggen',
      name: LOGIN,
      props: true,
      component: LoginPage
    },
    {
      path: '/:catchAll(.*)',
      name: NOT_FOUND,
      props: true,
      component: NotFound
    }
  ]
})

export default router
