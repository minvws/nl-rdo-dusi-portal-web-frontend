import ArrangementView from '@portal/pages/ArrangementView.vue'
import ExternalDetailPage from '@portal/pages/ExternalDetailPage.vue'
import ExternalPage from '@portal/pages/ExternalPage.vue'
import LocalForm from '@portal/pages/LocalForm.vue'
import LoginCallbackView from '@portal/pages/LoginCallbackView.vue'
import MyMessageDetails from '@portal/pages/MyMessageDetails.vue'
import MyMessagesView from '@portal/pages/MyMessagesView.vue'
import MyRequestStatus from '@portal/pages/MyRequestStatus.vue'
import MyRequestDetails from '@portal/pages/MyRequestDetails.vue'
import MyRequestEdit from '@portal/pages/MyRequestEdit.vue'
import MyRequestsView from '@portal/pages/MyRequestsView.vue'
import RemoteForm from '@portal/pages/RemoteForm.vue'

import { routes as sharedRoutes } from '@/@shared/router/routes'
import { beforeEach, afterEach } from '@/portal/router/router-guards'

const LOCAL_FORMS_ENABLED = import.meta.env.VITE_PORTAL_LOCAL_FORMS === 'true'

import {
  ARRANGEMENT_DETAILS,
  ARRANGEMENT_FORM_LOCAL,
  ARRANGEMENT_FORM_REMOTE,
  EXTERNAL_DETAIL,
  EXTERNAL,
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
  LOCAL_FORMS_ENABLED && {
    path: '/regelingen/:id',
    name: ARRANGEMENT_DETAILS,
    component: ArrangementView,
    children: [
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
  !LOCAL_FORMS_ENABLED && {
    path: '/regelingen/:id',
    name: ARRANGEMENT_FORM_REMOTE,
    component: RemoteForm,
    props: true
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
].filter(route => !!route)

export default { routes, beforeEach, afterEach }
