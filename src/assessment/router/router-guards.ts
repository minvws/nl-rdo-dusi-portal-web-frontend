import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordName } from 'vue-router'

import { storeToRefs } from 'pinia'

import { useAuthStore } from '@assessment/store/useAuthStore'

import { log } from '@shared/utils/logger'
import { setRouteCookie } from '@shared/utils/route-cookie'

import {
  HOME,
  LOGIN_VIEW,
  NOT_FOUND,
  PASSWORD_UPDATE_VIEW,
  TWO_FACTOR_VIEW
} from '@assessment/router/names'

const REDIRECT = [NOT_FOUND, HOME]

export const beforeEach = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const needsRedirect = REDIRECT.includes(to.name as string)
  const authStore = useAuthStore()
  const { canVisitRoute, homeRoute, isLoggedIn, isPasswordExpired } = storeToRefs(authStore)
  await authStore.getUserInfo(to.name as RouteRecordName)

  if ((to.name === LOGIN_VIEW || to.name === TWO_FACTOR_VIEW) && isLoggedIn.value) {
    return next({ name: homeRoute.value })
  }

  if (to.meta.public) {
    return next()
  }

  if (isLoggedIn.value) {
    authStore.verifyRouteForUserRole(to.name as string)
    authStore.setHomeRoute()
  }

  if (!isLoggedIn.value) {
    log(`page is non-public and user is not logged-in. go to'${LOGIN_VIEW}'`)
    return next({ name: LOGIN_VIEW })
  }

  if (isPasswordExpired.value) {
    if (to.name !== PASSWORD_UPDATE_VIEW) {
      return next({ name: PASSWORD_UPDATE_VIEW })
    }
    return next()
  }

  if (needsRedirect) {
    log(`user is logged-in. go to '${HOME}'`)
    return next({ name: HOME })
  }

  if (!canVisitRoute.value) {
    log(`user is logged-in but cannot visit '${to.name as string}', check user roles.`)
    return next({ name: homeRoute.value })
  }

  next()
}

export const afterEach = (to: RouteLocationNormalized) => {
  if (to.name !== LOGIN_VIEW) {
    setRouteCookie(to)
  }
}
