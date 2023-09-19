import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { storeToRefs } from 'pinia'

import { useAuthStore } from '@assessment/store/useAuthStore'

import LandingPage from '@assessment/pages/LandingPage.vue'
import LoginView from '@assessment/pages/LoginView.vue'
import MyCasesView from '@assessment/pages/MyCasesView.vue'
import MyCaseDetails from '@assessment/pages/MyCaseDetails.vue'
import ReviewCase from '@assessment/pages/ReviewCase.vue'

import {
  HOME,
  LOGIN_VIEW,
  MY_CASE_DETAILS,
  MY_CASES_OVERVIEW,
  REVIEW_CASE
} from '@assessment/router/names'

import { sharedRoutes} from '@shared/router/routes'

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
    name: MY_CASES_OVERVIEW,
    component: MyCasesView,
    children: [
      {
        path: ':id',
        name: MY_CASE_DETAILS,
        component: MyCaseDetails,
        props: true
      },
      {
        path: ':id/beoordeling',
        name: REVIEW_CASE,
        component: ReviewCase,
        props: true
      }
    ]
  },
  ...sharedRoutes
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
