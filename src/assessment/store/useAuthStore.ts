import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { useApiTwoFactorChallengeUrl, useApiLoginUrl } from '@assessment/composables/useApiUrl'
import { useNotificationsStore } from '@shared/store/useNotificationsStore'
import { useSessionLifetime } from '@shared/store/useSessionLifetime'

import { removeSessionCookie, setSessionCookie } from '@shared/utils/cookie'
import { log } from '@shared/utils/logger'

import type { AuthResponse, TwoFactorResponse } from '@shared/types/api-response'
import { HOME, LOGIN_VIEW, TWO_FACTOR_VIEW } from '@assessment/router/names'

export const useAuthStore = defineStore('useAuthStore', () => {
  const route = useRoute()
  const router = useRouter()
  const notificationsStore = useNotificationsStore()
  const { setSessionLifetime } = useSessionLifetime()

  const hasTwoFactor: Ref<boolean> = ref(false)
  const isLoggedIn: Ref<boolean> = ref(false)
  const token: Ref<string> = ref('')

  async function logIn(credentials: { email: string; password: string }) {
    try {
      const url = useApiLoginUrl()
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      }
      const response = await fetch(url, options)
      const json = await response.json()

      if (!response.ok) {
        switch (response.status) {
          case 401:
            setNotification('Login failed', 'Invalid credentials')
            break
          case 422:
            setNotification('Login failed', 'Invalid credentials')
            break
          case 429:
            setNotification('Login failed', 'Too many attempts')
            break
          default:
            setNotification('Login failed', 'Something went wrong')
            break
        }
      }

      setTwoFactorStatus(json)
    } catch (error) {
      log(error)
    }
  }

  function logOut() {
    isLoggedIn.value = false
    router.push({ name: LOGIN_VIEW })
  }

  async function twoFactorChallenge(code: string) {
    try {
      const url = useApiTwoFactorChallengeUrl()
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      }
      const response = await fetch(url, options)
      const json = await response.json()

      if (!response.ok) {
        switch (response.status) {
          case 419:
            setNotification('Login failed', 'Session expired')
            break
          default:
            setNotification('Login failed', 'Something went wrong')
            break
        }
      }

      setLoginStatus(json)
    } catch (error) {
      log(error)
    }
  }

  function setTwoFactorStatus({ two_factor }: TwoFactorResponse) {
    hasTwoFactor.value = two_factor
  }

  function setLoginStatus({ logged_in }: AuthResponse) {
    isLoggedIn.value = logged_in
  }

  function onLoginChange(isLoggedIn: boolean) {
    if (isLoggedIn) {
      const duration = setSessionCookie()
      setSessionLifetime(duration)
      return
    }

    removeSessionCookie()
    setSessionLifetime(undefined)

    if (route.meta.public || route.name === HOME) {
      return
    }

    router.push({ name: HOME })
  }

  function onTwoFactorChange(hasTwoFactor: boolean) {
    hasTwoFactor ? router.push({ name: TWO_FACTOR_VIEW }) : (isLoggedIn.value = true)
  }

  function setNotification(label: string, message: string) {
    notificationsStore.add({
      displayAs: 'error',
      label: label,
      message: message
    })
  }

  watch(hasTwoFactor, hasTwoFactor => onTwoFactorChange(hasTwoFactor))
  watch(isLoggedIn, isLoggedIn => onLoginChange(isLoggedIn))

  return {
    isLoggedIn,
    hasTwoFactor,
    logIn,
    logOut,
    twoFactorChallenge
  }
})
