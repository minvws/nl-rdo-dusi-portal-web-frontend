import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@portal/store/useAuthStore'

import NotFound from '@shared/pages/NotFound.vue'

import ArrangementView from '@portal/pages/ArrangementView.vue'
import ExternalDetailPage from '@portal/pages/ExternalDetailPage.vue'
import ExternalPage from '@portal/pages/ExternalPage.vue'
import FormSent from '@portal/pages/FormSent.vue'
import LandingPage from '@portal/pages/LandingPage.vue'
import LocalForm from '@portal/pages/LocalForm.vue'
import LoginCallbackView from '@portal/pages/LoginCallbackView.vue'
import MyDetailsEdit from '@portal/pages/MyDetailsEdit.vue'
import MyDetailsView from '@portal/pages/MyDetailsView.vue'
import MyRequestsView from '@portal/pages/MyRequestsView.vue'
import MyMessagesOverview from '@portal/pages/MyMessagesOverview.vue'
import MyRequestDetails from '@portal/pages/MyRequestDetails.vue'
import RemoteForm from '@portal/pages/RemoteForm.vue'

import { setRouteCookie } from '@shared/utils/cookie'
import { log } from '@shared/utils/logger'
import { notFoundLoggedOutRedirectLink } from '@/@shared/external-links'

import {
  ARRANGEMENT_DETAILS,
  ARRANGEMENT_FORM_LOCAL,
  ARRANGEMENT_FORM_REMOTE,
  EXTERNAL_DETAIL,
  EXTERNAL,
  FORM_SENT,
  HOME,
  LOGIN_CALLBACK_VIEW,
  MY_DETAILS_OVERVIEW,
  MY_DETAILS_EDIT,
  MY_MESSAGES_PAGE,
  MY_MESSAGES,
  MY_REQUESTS_DETAILS,
  MY_REQUESTS_OVERVIEW,
  NOT_FOUND
} from '@shared/router/names'
import { openExternalLink } from '@/@shared/utils/link'

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
    path: '/regelingen/:id',
    name: ARRANGEMENT_DETAILS,
    component: ArrangementView,
    children: [
      {
        path: 'aanvraag-verzonden',
        name: FORM_SENT,
        component: FormSent,
        props: true
      },
      {
        path: 'aanvragen-remote',
        name: ARRANGEMENT_FORM_REMOTE,
        props: true,
        component: RemoteForm
      },
      {
        path: ':name/aanvragen-local',
        name: ARRANGEMENT_FORM_LOCAL,
        props: true,
        component: LocalForm
      }
    ]
  },
  {
    path: '/mijn-aanvragen',
    name: MY_REQUESTS_OVERVIEW,
    component: MyRequestsView,
    children: [
      {
        path: ':id',
        name: MY_REQUESTS_DETAILS,
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
    path: '/mijn-gegevens',
    name: MY_DETAILS_OVERVIEW,
    component: MyDetailsView,
    children: [
      {
        path: 'bewerken',
        name: MY_DETAILS_EDIT,
        component: MyDetailsEdit
      }
    ]
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

  if (to.name === NOT_FOUND) {
    if (!isLoggedIn.value) {
      log(`404 route and user is not logged-in. go to '${notFoundLoggedOutRedirectLink}'`)
      next(false)
      openExternalLink(notFoundLoggedOutRedirectLink)
    } else {
      log(`404 route and user is logged-in. go to '${MY_REQUESTS_OVERVIEW}'`)
      next({ name: MY_REQUESTS_OVERVIEW })
    }
    return
  }
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
