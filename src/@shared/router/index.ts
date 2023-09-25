import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw
} from 'vue-router'
import { routerLoader } from '@shared/utils/loader'

const baseUrl = import.meta.env.BASE_URL

export const create = ({
  routes,
  beforeEach,
  afterEach
}: {
  routes: RouteRecordRaw[]
  beforeEach?: (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    _next: NavigationGuardNext
  ) => void
  afterEach?: (_to: RouteLocationNormalized) => void
}) => {
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
    routes
  })

  if (beforeEach) router.beforeEach(beforeEach)
  if (afterEach) router.afterEach(afterEach)

  return router
}

export default async () => {
  const { default: router } = await routerLoader()
  return create(router)
}
