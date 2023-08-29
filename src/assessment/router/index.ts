import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@assessment/store/useAuthStore'

import NotFound from '@shared/pages/NotFound.vue'

import LandingPage from '@assessment/pages/LandingPage.vue'
import LoginView from '@assessment/pages/LoginView.vue'
import MyRequestsView from '@assessment/pages/MyRequestsView.vue'
import MyRequestsDetails from '@assessment/pages/MyRequestsDetails.vue'
import ReviewRequest from '@assessment/pages/ReviewRequest.vue'

import {
  HOME,
  LOGIN_VIEW,
  MY_REQUESTS_DETAILS,
  MY_REQUESTS_OVERVIEW,
  NOT_FOUND,
  REVIEW_REQUEST
} from '@shared/router/names'

import { setRouteCookie } from '@shared/utils/cookie'
import { log } from '@shared/utils/logger'

const routes = [
  {
    path: '/',
    name: HOME,
    component: LandingPage
  },
  {
    path: '/inloggen',
    name: LOGIN_VIEW,
    component: LoginView,
    meta: {
      public: true
    }
  },
  {
    path: '/mijn-zaken',
    name: MY_REQUESTS_OVERVIEW,
    component: MyRequestsView,
    children: [
      {
        path: ':id',
        name: MY_REQUESTS_DETAILS,
        component: MyRequestsDetails,
        props: true
      },
      {
        path: ':id/beoordeling',
        name: REVIEW_REQUEST,
        component: ReviewRequest,
        props: true
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
  const { isLoggedIn } = storeToRefs(authStore)

  if (to.meta.public || isLoggedIn.value) {
    next()
    return
  }

  log('route is not `public` and user is not logged-in, redirection to `login`')
  next({ name: LOGIN_VIEW })
}

// Set cookie with current route after each route change.
const afterEach = (to: RouteLocationNormalized) => {
  if (to.name !== LOGIN_VIEW) {
    setRouteCookie(to)
  }
}

export default { routes, beforeEach, afterEach }
