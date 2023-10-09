import AllCasesOverview from '@assessment/pages/AllCasesOverview.vue'
import ForgotPasswordView from '@assessment/pages/ForgotPasswordView.vue'
import LoginView from '@assessment/pages/LoginView.vue'
import MyCasesView from '@assessment/pages/MyCasesView.vue'
import MyCaseDetails from '@assessment/pages/MyCaseDetails.vue'
import ReviewCase from '@assessment/pages/ReviewCase.vue'
import PreviewCaseSubmit from '@assessment/pages/PreviewCaseSubmit.vue'
import TwoFactorView from '@assessment/pages/TwoFactorView.vue'
import RefreshView from '@assessment/pages/RefreshView.vue'
import PasswordUpdateView from '@assessment/pages/PasswordUpdateView.vue'
import PasswordResetView from '@assessment/pages/PasswordResetView.vue'

import {
  HOME,
  LOGIN_VIEW,
  ALL_CASES_OVERVIEW,
  FORGOT_PASSWORD,
  MY_CASE_DETAILS,
  MY_CASE_DETAILS_HISTORY,
  MY_CASE_DETAILS_REVIEWER,
  MY_CASES_OVERVIEW,
  REVIEW_CASE,
  PREVIEW_CASE_SUBMIT,
  TWO_FACTOR_VIEW,
  REFRESH,
  PASSWORD_UPDATE_VIEW,
  PASSWORDS_RESET
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
