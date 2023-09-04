import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { useApiTwoFactorChallengeUrl, useApiLoginUrl } from '@assessment/composables/useApiUrl'
import { useSessionLifetime } from '@shared/store/useSessionLifetime'

import { removeSessionCookie, setSessionCookie } from '@shared/utils/cookie'
import { log } from '@shared/utils/logger'
import { HOME, LOGIN_VIEW } from '@shared/router/names'

import type { LogInResponse, LogOutResponse } from '@shared/types/api-response'

export const useAuthStore = defineStore('useAuthStore', () => {
  const route = useRoute()
  const router = useRouter()
  const { setSessionLifetime } = useSessionLifetime()

  const isLoggedIn: Ref<boolean> = ref(false)

  async function logIn(credentials: { email: string; password: string }) {
    try {
      const url = useApiLoginUrl()
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: JSON.stringify(credentials)
      }
      const response = await fetch(url, options)
      const loggedIn = await response.json()

      setLoginStatus(loggedIn)
    } catch (error) {
      log('log-in error', error)
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
          Accept: 'application/json'
        },
        body: JSON.stringify({ code })
      }
      const response = await fetch(url, options)
      const { statusCode } = await response.json()
      console.log('statusCode', statusCode)
    } catch (error) {
      log('two-factor error', error)
    }
  }

  function setLoginStatus({ logged_in }: LogInResponse | LogOutResponse) {
    isLoggedIn.value = logged_in
  }

  function onLoginChange(isLoggedIn: boolean) {
    // update session-cookie when isLoggedIn changes
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

    // user is logged-out, return to home when route is not public
    router.push({ name: HOME })
  }

  watch(isLoggedIn, isLoggedIn => onLoginChange(isLoggedIn))

  return {
    isLoggedIn,
    logIn,
    logOut,
    twoFactorChallenge
  }
})
