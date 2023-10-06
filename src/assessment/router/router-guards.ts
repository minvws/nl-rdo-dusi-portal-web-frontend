import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { nextTick } from 'vue'

import { storeToRefs } from 'pinia'

import { useAuthStore } from '@assessment/store/useAuthStore'

import { log } from '@shared/utils/logger'
import { setRouteCookie } from '@shared/utils/route-cookie'

import { HOME, LOGIN_VIEW, NOT_FOUND, PASSWORD_UPDATE_VIEW } from '@assessment/router/names'

const REDIRECT = [NOT_FOUND, HOME]

export const beforeEach = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  if (to.name !== LOGIN_VIEW) {
    await authStore.getUserInfo()
  }

  const { isLoggedIn, isPasswordExpired } = storeToRefs(authStore)

  if (to.meta.public) {
    return next()
  }

  const needsRedirect = REDIRECT.includes(to.name as string)

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

  next()
}

export const afterEach = (to: RouteLocationNormalized) => {
  if (to.name !== LOGIN_VIEW) {
    setRouteCookie(to)
  }
}
