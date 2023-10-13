import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { storeToRefs } from 'pinia'

import { useAuthStore } from '@portal/store/useAuthStore'

import { log } from '@shared/utils/logger'
import { notFoundLoggedOutRedirectLink } from '@shared/external-links'
import { openExternalLink } from '@shared/utils/link'
import { setRouteCookie } from '@shared/utils/route-cookie'

import { HOME, LOGIN_CALLBACK_VIEW, MY_REQUESTS_OVERVIEW, NOT_FOUND } from '@portal/router/names'

const REDIRECT = [NOT_FOUND, HOME]

export const beforeEach = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  await authStore.sessionRestore()

  const { isLoggedIn } = storeToRefs(authStore)

  if (to.meta.public) {
    return next()
  }

  const needsRedirect = REDIRECT.includes(to.name as string)

  if (needsRedirect && !isLoggedIn.value) {
    if (import.meta.env.VITE_DISABLE_LOGIN_REDIRECT_HOME === 'true') {
      log('redirect disabled, do not redirect')
    } else {
      log(`user is not logged-in. go to '${notFoundLoggedOutRedirectLink}'`)
      openExternalLink(notFoundLoggedOutRedirectLink)
    }
    return next(false)
  }

  if (!isLoggedIn.value) {
    log('page is non-public and user is not logged-in. goto api-login')
    authStore.onAuthenticate()
    return next(false)
  }

  if (needsRedirect) {
    log(`user is logged-in. go to '${MY_REQUESTS_OVERVIEW}'`)
    return next({ name: MY_REQUESTS_OVERVIEW })
  }

  next()
}

export const afterEach = (to: RouteLocationNormalized) => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  if (to.name !== LOGIN_CALLBACK_VIEW && !isLoggedIn.value) {
    // Set cookie with current route after each route change.
    setRouteCookie(to)
  }
}
