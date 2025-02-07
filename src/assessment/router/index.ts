const AllCasesOverview = () => import('@assessment/pages/AllCasesOverview.vue')
const CheckDetails = () => import('@assessment/pages/CheckDetails.vue')
const ChecksView = () => import('@assessment/pages/ChecksView.vue')
const ForgotPasswordView = () => import('@assessment/pages/ForgotPasswordView.vue')
const LoginView = () => import('@assessment/pages/LoginView.vue')
const MyCaseDetails = () => import('@assessment/pages/MyCaseDetails.vue')
const MyCasesView = () => import('@assessment/pages/MyCasesView.vue')
const PasswordResetView = () => import('@assessment/pages/PasswordResetView.vue')
const PasswordUpdateView = () => import('@assessment/pages/PasswordUpdateView.vue')
const PreviewCaseSubmit = () => import('@assessment/pages/PreviewCaseSubmit.vue')
const ProfileView = () => import('@assessment/pages/ProfileView.vue')
const RefreshView = () => import('@assessment/pages/RefreshView.vue')
const ReportDetails = () => import('@assessment/pages/ReportDetails.vue')
const ReportsView = () => import('@assessment/pages/ReportsView.vue')
const ReviewCase = () => import('@assessment/pages/ReviewCase.vue')
const TwoFactorView = () => import('@assessment/pages/TwoFactorView.vue')

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
  PASSWORD_RESET_VIEW,
  PREVIEW_CASE_SUBMIT,
  PROFILE_VIEW,
  REFRESH,
  REPORT_DETAILS,
  REPORTS_OVERVIEW,
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
    path: '/profiel',
    name: PROFILE_VIEW,
    component: ProfileView
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
    name: PASSWORD_RESET_VIEW,
    component: PasswordResetView,
    meta: {
      public: true
    }
  },
  {
    path: '/rapportages',
    name: REPORTS_OVERVIEW,
    component: ReportsView,
    children: [
      {
        path: ':name',
        name: REPORT_DETAILS,
        component: ReportDetails,
        props: true
      }
    ]
  },
  ...sharedRoutes
]

export default { routes, beforeEach, afterEach }
