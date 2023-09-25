import type { RouteLocationNormalized } from 'vue-router'

import cookie from 'js-cookie'

export const ROUTES_COOKIE_NAME = 'dus_i_portal_route'
export const SESSION_COOKIE_NAME = 'dus_i_portal_session'

function getCookie(key: string) {
  const stored = cookie.get(key) || ''
  try {
    return JSON.parse(stored)
  } catch {
    return undefined
  }
}

function removeCookie(key: string) {
  cookie.remove(key)
}

export function setRouteCookie(route: RouteLocationNormalized) {
  const { name, params } = route
  cookie.set(ROUTES_COOKIE_NAME, JSON.stringify({ name, params }), { expires: 1, secure: true })
}

export function getRouteFromCookie() {
  return getCookie(ROUTES_COOKIE_NAME)
}

export function setSessionCookie() {
  const duration = 15 * 60 * 1000 // 15 mins
  const expires = new Date(new Date().getTime() + duration)
  const value = JSON.stringify({ timestamp: `${expires}` })
  cookie.set(SESSION_COOKIE_NAME, value, { expires })
  return duration
}

export function getSessionCookie() {
  return getCookie(SESSION_COOKIE_NAME)
}

export function removeSessionCookie() {
  removeCookie(SESSION_COOKIE_NAME)
}
