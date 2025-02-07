import type { RouteLocationNormalized } from 'vue-router'

import { getCookie, removeCookie, setCookie } from '@shared/utils/cookies'

export const ROUTES_COOKIE_NAME = 'dus_i_portal_route'

export function deleteRouteCookie() {
  removeCookie(ROUTES_COOKIE_NAME)
}

export function setRouteCookie(route: RouteLocationNormalized) {
  const { name, params } = route
  const options = { expires: 1, secure: true }
  const data = { name, params }

  setCookie(ROUTES_COOKIE_NAME, data, options)
}

export function getRouteFromCookie() {
  return getCookie(ROUTES_COOKIE_NAME)
}
