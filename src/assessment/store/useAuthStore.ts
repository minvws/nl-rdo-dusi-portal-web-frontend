import type { Ref } from 'vue'
import type { TwoFactorResponse } from '@shared/types/api-response'
import type { User } from '@shared/types/user'

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { translate } from '@shared/i18n'

import {
  useApiLoginUrl,
  useApiLogoutUrl,
  useApiTwoFactorChallengeUrl,
  useApiUserStatusUrl
} from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'

import {
  getSessionCookie,
  removeSessionCookie,
  setSessionCookie
} from '@shared/utils/session-cookie'
import { log } from '@shared/utils/logger'

import { HOME, LOGIN_VIEW, TWO_FACTOR_VIEW } from '@assessment/router/names'

const useCredendials = !import.meta.env.PROD

export const useAuthStore = defineStore('useAuthStore', () => {
  const router = useRouter()
  const notificationsStore = useNotificationsStore()

  const init: Ref<boolean> = ref(false)
  const user: Ref<User | null> = ref(null)

  const isLoggedIn: Ref<boolean> = ref(false)

  async function getUserInfo() {
    try {
      const url = useApiUserStatusUrl()
      const options: RequestInit = { method: 'GET', credentials: 'include' }
      const response = await fetch(url, options)
      const json = await response.json()

      user.value = json
      isLoggedIn.value = true

      setSessionCookie()
      router.push({ name: HOME })
    } catch (error) {
      log('Error getting user info', error)
    }
  }

  async function logOut() {
    try {
      const url = useApiLogoutUrl()
      const options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(url, options)

      if (response.ok) {
        user.value = null
        isLoggedIn.value = false
      }
    } catch (error) {
      log('Error trying to log out', error)
    }
  }

  async function logIn(credentials: { email: string; password: string }) {
    try {
      const url = useApiLoginUrl()
      const options: RequestInit = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        ...(useCredendials && { credentials: 'include' }),
        body: JSON.stringify(credentials)
      }
      const response = await fetch(url, options)
      const json = await response.json()

      if (!response.ok) {
        switch (response.status) {
          case 422:
            return setNotification('login-invalid-credentials')
          case 429:
            return setNotification('login-too-many-attempts')
          default:
            return setNotification('login-failed')
        }
      }

      if (json) {
        const { two_factor } = json
        determineTwoFactorRoute({ two_factor })
      }
    } catch (error) {
      log('Error trying to log in', error)
    }
  }

  async function twoFactorChallenge(code: string) {
    try {
      const url = useApiTwoFactorChallengeUrl()
      const options: RequestInit = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ code })
      }
      const response = await fetch(url, options)

      if (!response.ok) {
        switch (response.status) {
          case 422:
            return setNotification('2fa-invalid-code')
          default:
            return setNotification('2fa-failed')
        }
      }

      if (response.status === 204) {
        isLoggedIn.value = true
      }
    } catch (error) {
      log('Error trying to use two-factor auth', error)
    }
  }

  function onLoginChange(isLoggedIn: boolean) {
    if (isLoggedIn) {
      getUserInfo()
    } else {
      removeSessionCookie()
      router.push({ name: LOGIN_VIEW })
    }
  }

  function restoreSession() {
    const sessionCookie = getSessionCookie()

    if (init.value) {
      return
    }

    init.value = true
    isLoggedIn.value = !!sessionCookie
  }

  function setNotification(type: string) {
    notificationsStore.add({
      id: 'login-error',
      pageChangeCount: 1,
      displayAs: 'error',
      label: translate(`authentication.${type}.label`) ?? '',
      message: translate(`authentication.${type}.message`) ?? '',
    })
  }

  function determineTwoFactorRoute({ two_factor }: TwoFactorResponse) {
    two_factor ? router.push({ name: TWO_FACTOR_VIEW }) : getUserInfo()
  }

  watch(isLoggedIn, isLoggedIn => onLoginChange(isLoggedIn))

  return {
    isLoggedIn,
    logIn,
    logOut,
    restoreSession,
    twoFactorChallenge,
    user
  }
})
