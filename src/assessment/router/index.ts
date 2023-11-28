import AllCasesOverview from '@assessment/pages/AllCasesOverview.vue'
import CheckDetails from '@assessment/pages/CheckDetails.vue'
import ChecksView from '@assessment/pages/ChecksView.vue'
import ForgotPasswordView from '@assessment/pages/ForgotPasswordView.vue'
import LoginView from '@assessment/pages/LoginView.vue'
import MyCaseDetails from '@assessment/pages/MyCaseDetails.vue'
import MyCasesView from '@assessment/pages/MyCasesView.vue'
import PasswordResetView from '@assessment/pages/PasswordResetView.vue'
import PasswordUpdateView from '@assessment/pages/PasswordUpdateView.vue'
import PreviewCaseSubmit from '@assessment/pages/PreviewCaseSubmit.vue'
import RefreshView from '@assessment/pages/RefreshView.vue'
import ReviewCase from '@assessment/pages/ReviewCase.vue'
import TwoFactorView from '@assessment/pages/TwoFactorView.vue'

import {
  ALL_CASES_OVERVIEW,
  CHECK_DETAILS,
  CHECKS_OVERVIEW,
  FORGOT_PASSWORD,
  HOME,
  LOGIN_VIEW,
  MY_CASE_DETAILS_HISTORY,
  MY_CASE_DETAILS_REVIEWER,
  MY_CASE_DETAILS,
  MY_CASES_OVERVIEW,
  PASSWORD_UPDATE_VIEW,
  PASSWORDS_RESET,
  PREVIEW_CASE_SUBMIT,
  REFRESH,
  REVIEW_CASE,
  TWO_FACTOR_VIEW
} from '@assessment/router/names'

import { sharedRoutes } from '@shared/router/routes'
import { beforeEach, afterEach } from '@assessment/router/router-guards'

const routes = [
  {
    path: '/',
    name: HOME,
    redirect: { name: MY_CASES_OVERVIEW }
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
        path: ':id/geschiedenis',
        name: MY_CASE_DETAILS_HISTORY,
        component: MyCaseDetails,
        props: true
      },
      {
        path: ':id/beoordelaar',
        name: MY_CASE_DETAILS_REVIEWER,
        component: MyCaseDetails,
        props: true
      },
      {
        path: ':id/beoordeling',
        name: REVIEW_CASE,
        component: ReviewCase,
        props: true
      },
      {
        path: ':id/beoordeling/bevestigen',
        name: PREVIEW_CASE_SUBMIT,
        component: PreviewCaseSubmit,
        props: true
      }
    ]
  },
  {
    path: '/alle-zaken',
    name: ALL_CASES_OVERVIEW,
    component: AllCasesOverview
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
    path: '/controles',
    name: CHECKS_OVERVIEW,
    component: ChecksView,
    children: [
      {
        path: '/controles/:name',
        name: CHECK_DETAILS,
        component: CheckDetails,
        props: true
      }
    ]
  },
  {
    path: '/refresh',
    name: REFRESH,
    component: RefreshView
  },
  {
    path: '/verificatie',
    name: TWO_FACTOR_VIEW,
    component: TwoFactorView,
    meta: {
      public: true
    }
  },
  {
    path: '/wachtwoord-wijzigen',
    name: PASSWORD_UPDATE_VIEW,
    component: PasswordUpdateView
  },
  {
    path: '/wachtwoord-vergeten',
    name: FORGOT_PASSWORD,
    component: ForgotPasswordView,
    meta: {
      public: true
    }
  },
  {
    path: '/wachtwoord-reset',
    name: PASSWORDS_RESET,
    component: PasswordResetView,
    meta: {
      public: true
    }
  },
  ...sharedRoutes
]

export default { routes, beforeEach, afterEach }
