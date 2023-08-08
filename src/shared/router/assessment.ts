import { createRouter, createWebHistory } from 'vue-router'

import AssessmentHomePage from '@/shared/pages/AssessmentHomePage.vue'
import MyRequestsView from '@/shared/pages/MyRequestsView.vue'
import NotFound from '@/shared/pages/NotFound.vue'
import MyRequestsDetails from '@/shared/pages/MyRequestsDetails.vue'
import ReviewRequest from '@/shared/pages/ReviewRequest.vue'

import {
  HOME,
  MY_REQUESTS_DETAILS,
  MY_REQUESTS_OVERVIEW,
  NOT_FOUND,
  REVIEW_REQUEST
} from '@/shared/router/names'

const baseUrl = import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(baseUrl),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path: '/',
      name: HOME,
      component: AssessmentHomePage,
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
          path: ':id/beoordelen',
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
})

export default router
