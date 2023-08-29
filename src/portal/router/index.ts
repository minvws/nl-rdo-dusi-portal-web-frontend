import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@portal/store/useAuthStore'

import NotFound from '@shared/pages/NotFound.vue'

import ArrangementsView from '@portal/pages/ArrangementsView.vue'
import ArrangementView from '@portal/pages/ArrangementView.vue'
import ExternalDetailPage from '@portal/pages/ExternalDetailPage.vue'
import ExternalPage from '@portal/pages/ExternalPage.vue'
import FormSent from '@portal/pages/FormSent.vue'
import LandingPage from '@portal/pages/LandingPage.vue'
import LocalForm from '@portal/pages/LocalForm.vue'
import LoginCallbackView from '@portal/pages/LoginCallbackView.vue'
import MyFileView from '@portal/pages/MyFileView.vue'
import MyMessagesOverview from '@portal/pages/MyMessagesOverview.vue'
import MyRequestDetails from '@portal/pages/MyRequestDetails.vue'
import RemoteForm from '@portal/pages/RemoteForm.vue'

import {
  ARRANGEMENT_DETAILS,
  ARRANGEMENT_FORM_LOCAL,
  ARRANGEMENT_FORM_REMOTE,
  ARRANGEMENT_OVERVIEW_PAGE,
  ARRANGEMENT_OVERVIEW,
  EXTERNAL_DETAIL,
  EXTERNAL,
  FORM_SENT,
  HOME,
  LOGIN_CALLBACK_VIEW,
  MY_FILE_OVERVIEW,
  MY_MESSAGES_PAGE,
  MY_MESSAGES,
  MY_REQUEST_DETAILS,
  NOT_FOUND
} from '@shared/router/names'

import { setRouteCookie } from '@shared/utils/cookie'
import { log } from '@shared/utils/logger'

const routes = [
  {
    path: '/',
    name: HOME,
    component: LandingPage,
    meta: {
      public: true
    }
  },
  {
    path: '/external/detail/:id/:url?',
    name: EXTERNAL_DETAIL,
    component: ExternalDetailPage,
    props: true,
    meta: {
      public: true
    }
  },
  {
    path: '/external/:page?',
    name: EXTERNAL,
    component: ExternalPage,
    props: true,
    meta: {
      public: true
    }
  },
  {
    path: '/login-callback',
    name: LOGIN_CALLBACK_VIEW,
    component: LoginCallbackView,
    meta: {
      public: true
    }
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
        meta: {
          public: false
        },
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
        component: MyRequestDetails,
        props: true
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
    path: '/:catchAll(.*)',
    name: NOT_FOUND,
    props: true,
    component: NotFound,
    meta: {
      public: true
    }
  }
]

// Protected router, redirect to home if not logged in.
const beforeEach = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  await authStore.restoreSession()
  const { isLoggedIn } = storeToRefs(authStore)
  if (to.meta.public || isLoggedIn.value) {
    next()
    return
  }

  log('route is not `public` and user is not logged-in, redirection to `home`')
  next({ name: HOME })
}

// Set cookie with current route after each route change.
const afterEach = (to: RouteLocationNormalized) => {
  if (to.name !== LOGIN_CALLBACK_VIEW) {
    setRouteCookie(to)
  }
}

export default { routes, beforeEach, afterEach }
