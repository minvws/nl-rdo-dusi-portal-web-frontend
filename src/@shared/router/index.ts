import { createRouter, createWebHistory } from 'vue-router'

import portalRouter from '@portal/router'
import reviewRouter from '@review/router'

import { portalProject } from '../utils/env'

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
  routes: portalProject ? portalRouter.routes : reviewRouter.routes
})

// add beforeEach and afterEach hooks for portal project
portalProject && router.beforeEach(portalRouter.beforeEach)

portalProject && router.afterEach(portalRouter.afterEach)

export default router
