import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/shared/store/useAuthStore'

import ArrangementsView from '@/shared/pages/ArrangementsView.vue'
import ArrangementView from '@/shared/pages/ArrangementView.vue'
import ExternalDetailPage from '@/shared/pages/ExternalDetailPage.vue'
import ExternalPage from '@/shared/pages/ExternalPage.vue'
import FormSent from '@/shared/pages/FormSent.vue'
import LandingPage from '@/shared/pages/LandingPage.vue'
import LocalForm from '@/shared/pages/LocalForm.vue'
import LoginCallback from '@/shared/pages/LoginCallback.vue'
import MyFileView from '@/shared/pages/MyFileView.vue'
import MyMessagesOverview from '@/shared/pages/MyMessagesOverview.vue'
import MyRequestDetails from '@/shared/pages/MyRequestDetails.vue'
import NotFound from '@/shared/pages/NotFound.vue'
import RemoteForm from '@/shared/pages/RemoteForm.vue'

import {
  ARRANGEMENT_DETAILS,
  ARRANGEMENT_FORM_LOCAL,
  ARRANGEMENT_FORM_REMOTE,
  ARRANGEMENT_OVERVIEW_PAGE,
  ARRANGEMENT_OVERVIEW,
  EXTERNAL,
  EXTERNAL_DETAIL,
  FORM_SENT,
  HOME,
  LOGIN_CALLBACK,
  MY_FILE_OVERVIEW,
  MY_MESSAGES_PAGE,
  MY_MESSAGES,
  MY_REQUEST_DETAILS,
  NOT_FOUND
} from '@/shared/router/names'
import { setRouteCookie } from '@/shared/util/cookie-util'
import { log } from '@/shared/util/logger-util'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  // router-link-active router-link-exact-active
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path: '/',
      name: HOME,
      component: LandingPage,
      meta: {
        public: true
      }
    },
    {
      path: '/external/detail/:id',
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
      name: LOGIN_CALLBACK,
      component: LoginCallback,
      meta: {
        public: true
      }
    },
    {
      path: '/regelingen/pagina/:page',
      name: ARRANGEMENT_OVERVIEW_PAGE,
      component: ArrangementsView,
      props: true
    },
    {
      path: '/regelingen',
      name: ARRANGEMENT_OVERVIEW,
      component: ArrangementsView,
      children: [
        {
          path: ':id',
          name: ARRANGEMENT_DETAILS,
          component: ArrangementView,
          meta: {
            public: false
          },
          children: [
            {
              path: 'aanvraag-verzonden',
              name: FORM_SENT,
              component: FormSent
            },
            {
              path: 'aanvragen-remote',
              name: ARRANGEMENT_FORM_REMOTE,
              props: true,
              component: RemoteForm
            },
            {
              path: 'aanvragen-local',
              name: ARRANGEMENT_FORM_LOCAL,
              component: LocalForm
            }
          ]
        }
      ]
    },
    {
      path: '/mijn-dossier',
      name: MY_FILE_OVERVIEW,
      component: MyFileView,
      children: [
        {
          path: 'aanvragen/:id',
          name: MY_REQUEST_DETAILS,
          component: MyRequestDetails
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

// Protected router, redirect to home if not logged in.
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  await authStore.restoreSession()
  const { isLoggedIn } = storeToRefs(authStore)

  if (to.meta.public || isLoggedIn.value) {
    next()
    return
  }

  log('route is not `public` and user is not logged-in, redirection to `home`')
  next({ name: HOME })
})

// Set cookie with current route after each route change.
router.afterEach(to => {
  if (to.name !== LOGIN_CALLBACK) {
    setRouteCookie(to)
  }
})

export default router
