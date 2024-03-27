const ArrangementView = () => import('@portal/pages/ArrangementView.vue')
const ArrangementDetails = () => import('@portal/pages/ArrangementDetails.vue')
const LocalForm = () => import('@portal/pages/LocalForm.vue')
const LoginCallbackView = () => import('@portal/pages/LoginCallbackView.vue')
const MyMessageDetails = () => import('@portal/pages/MyMessageDetails.vue')
const MyMessagesView = () => import('@portal/pages/MyMessagesView.vue')
const MyRequestStatus = () => import('@portal/pages/MyRequestStatus.vue')
const MyRequestDetails = () => import('@portal/pages/MyRequestDetails.vue')
const MyRequestEdit = () => import('@portal/pages/MyRequestEdit.vue')
const MyRequestsView = () => import('@portal/pages/MyRequestsView.vue')

import { sharedRoutes } from '@shared/router/routes'
import { beforeEach, afterEach } from '@portal/router/router-guards'

const LOCAL_FORMS_ENABLED = import.meta.env.VITE_PORTAL_LOCAL_FORMS === 'true'

import {
  ARRANGEMENT_DETAILS,
  ARRANGEMENT_FORM_LOCAL,
  ARRANGEMENT_OVERVIEW,
  HOME,
  LOGIN_CALLBACK_VIEW,
  MY_MESSAGE_DETAILS,
  MY_MESSAGES_OVERVIEW,
  MY_MESSAGES_PAGE,
  MY_REQUEST_DETAILS,
  MY_REQUEST_STATUS,
  MY_REQUEST_EDIT,
  MY_REQUESTS_OVERVIEW
} from '@portal/router/names'

const routes = [
  {
    path: '/',
    name: HOME
  },
  {
    path: '/login-callback',
    name: LOGIN_CALLBACK_VIEW,
    component: LoginCallbackView,
    meta: {
      public: true
    }
  },
  LOCAL_FORMS_ENABLED && {
    path: '/regelingen',
    redirect: { name: MY_REQUESTS_OVERVIEW },
    children: [
      {
        path: ':name',
        name: ARRANGEMENT_DETAILS,
        props: true,
        component: ArrangementDetails
      },
      {
        path: ':name/aanvragen-local',
        name: ARRANGEMENT_FORM_LOCAL,
        props: true,
        component: LocalForm
      }
    ]
  },
  !LOCAL_FORMS_ENABLED && {
    path: '/regelingen',
    redirect: { name: MY_REQUESTS_OVERVIEW },
    children: [
      {
        path: ':id',
        name: ARRANGEMENT_OVERVIEW,
        props: true,
        component: ArrangementView
      }
    ]
  },
  {
    path: '/mijn-aanvragen',
    name: MY_REQUESTS_OVERVIEW,
    component: MyRequestsView,
    children: [
      {
        path: ':reference/status',
        name: MY_REQUEST_STATUS,
        component: MyRequestStatus,
        props: true
      },
      {
        path: ':reference/details',
        name: MY_REQUEST_DETAILS,
        component: MyRequestDetails,
        props: true
      },
      {
        path: ':reference/bewerken',
        name: MY_REQUEST_EDIT,
        component: MyRequestEdit,
        props: true
      }
    ]
  },
  {
    path: '/mijn-berichten/pagina/:page',
    name: MY_MESSAGES_PAGE,
    component: MyMessagesView,
    props: true
  },
  {
    path: '/mijn-berichten',
    name: MY_MESSAGES_OVERVIEW,
    component: MyMessagesView,
    children: [
      {
        path: ':id',
        name: MY_MESSAGE_DETAILS,
        component: MyMessageDetails,
        props: true
      }
    ]
  },
  ...sharedRoutes
].filter((route) => !!route)

export default { routes, beforeEach, afterEach }
