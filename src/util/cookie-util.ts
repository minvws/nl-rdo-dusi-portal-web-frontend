import cookie from 'js-cookie'
import { ROUTES_COOKIE_NAME, SESSION_COOKIE_NAME } from '@/constants'
import type { RouteLocationNormalized } from 'vue-router'

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
  cookie.set(ROUTES_COOKIE_NAME, JSON.stringify(route), { expires: 1, secure: true })
}

export function getRouteFromCookie() {
  return getCookie(ROUTES_COOKIE_NAME)
}

export function setSessionCookie() {
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000) // 15 mins
  const value = JSON.stringify({ timestamp: `${expires}` })
  cookie.set(SESSION_COOKIE_NAME, value, { expires })
}

export function getSessionCookie() {
  return getCookie(SESSION_COOKIE_NAME)
}

export function removeSessionCookie() {
  removeCookie(SESSION_COOKIE_NAME)
}

export function getCSRFToken() {
  return cookie.get('XSRF-TOKEN')
}
