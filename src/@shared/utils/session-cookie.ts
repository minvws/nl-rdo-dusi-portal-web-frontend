import { getCookie, removeCookie, setCookie } from '@shared/utils/cookies'

const SESSION_COOKIE_NAME = `dus_i_${import.meta.env.VITE_PROJECT}_session`

const sessionDuration = window?.config?.sessionDuration || import.meta.env.VITE_SESSION_DURATION

export function setSessionCookie() {
  const duration = sessionDuration * 1000
  const expires = new Date(Date.now() + duration)
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
