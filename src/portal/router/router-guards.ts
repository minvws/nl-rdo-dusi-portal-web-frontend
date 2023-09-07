import { log } from '@shared/utils/logger'
import { notFoundLoggedOutRedirectLink } from '@/@shared/external-links'
import { openExternalLink } from '@/@shared/utils/link'
import { setRouteCookie } from '@shared/utils/cookie'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@portal/store/useAuthStore'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { HOME, LOGIN_CALLBACK_VIEW, MY_REQUESTS_OVERVIEW, NOT_FOUND } from '@shared/router/names'

export const beforeEach = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  await authStore.restoreSession()
  const { isLoggedIn } = storeToRefs(authStore)

  if (to.name === NOT_FOUND || to.name === HOME) {
    if (!isLoggedIn.value) {
      next(false)
      if (to.name === HOME && import.meta.env.VITE_DISABLE_LOGIN_REDIRECT_HOME) {
        log('login on home disabled, do not redirect')
        // do not redirect, convenient during development
        return
      }
      log(`user is not logged-in. go to '${notFoundLoggedOutRedirectLink}'`)
      openExternalLink(notFoundLoggedOutRedirectLink)
    } else {
      log(`user is logged-in. go to '${MY_REQUESTS_OVERVIEW}'`)
      next({ name: MY_REQUESTS_OVERVIEW })
    }
    return
  }

  if (to.meta.public || isLoggedIn.value) {
    next()
    return
  }

  log('route is not `public` and user is not logged-in, redirection to `home`')
  next(HOME)
}

export const afterEach = (to: RouteLocationNormalized) => {
  if (to.name !== LOGIN_CALLBACK_VIEW) {
    // Set cookie with current route after each route change.
    setRouteCookie(to)
  }
}
