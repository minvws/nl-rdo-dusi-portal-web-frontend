import NotFound from '@shared/pages/NotFound.vue'

import LandingPage from '@assessment/pages/LandingPage.vue'
import MyRequestsView from '@assessment/pages/MyRequestsView.vue'
import MyRequestsDetails from '@assessment/pages/MyRequestsDetails.vue'
import ReviewRequest from '@assessment/pages/ReviewRequest.vue'

import {
  HOME,
  MY_REQUESTS_DETAILS,
  MY_REQUESTS_OVERVIEW,
  NOT_FOUND,
  REVIEW_REQUEST
} from '@shared/router/names'

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

export default { routes }
