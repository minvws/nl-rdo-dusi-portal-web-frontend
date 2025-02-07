import cookie from 'js-cookie'

export function getCookie(key: string) {
  const stored = cookie.get(key) || ''

  try {
    return JSON.parse(stored)
  } catch {
    return undefined
  }
}

export function removeCookie(key: string) {
  cookie.remove(key)
}

export function setCookie(key: string, value: any, options: any) {
  cookie.set(key, JSON.stringify(value), options)
}
