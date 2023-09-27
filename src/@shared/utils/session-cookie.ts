import { getCookie, removeCookie, setCookie } from '@shared/utils/cookies'

const SESSION_COOKIE_NAME = `dus_i_${import.meta.env.VITE_PROJECT}_session`

export function setSessionCookie() {
  const duration = 15 * 60 * 1000 // 15 mins
  const expires = new Date(new Date().getTime() + duration)
  const value = JSON.stringify({ timestamp: `${expires}` })
  setCookie(SESSION_COOKIE_NAME, value, { expires })
  return duration
}

export function getSessionCookie() {
  return getCookie(SESSION_COOKIE_NAME)
}

export function removeSessionCookie() {
  removeCookie(SESSION_COOKIE_NAME)
}
