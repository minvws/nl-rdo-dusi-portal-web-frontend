import type { AuthResponse } from '@shared/types/api-response'
import { SessionType } from '@shared/types/session'

import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { useApiLoginUrl, useApiLogoutUrl, useApiUserStatusUrl } from '@portal/composables/useApiUrl'
import { useSessionLifetimeStore } from '@shared/store/useSessionLifetimeStore'
import { useDispatcher } from '@shared/store/useDispatcher'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import { log } from '@shared/utils/logger'
import { deleteRouteCookie } from '@shared/utils/route-cookie'
import { openExternalLink } from '@shared/utils/link'

import { HOME } from '@shared/router/names'

export const useAuthStore = defineStore('useAuthStore', () => {
  const route = useRoute()
  const router = useRouter()
  const sessionLifetimeStore = useSessionLifetimeStore()
  const { on } = useDispatcher()

  const isLoggedIn = ref<boolean>(false)

  async function logIn(extendSession = false): Promise<void> {
    try {
      const url = useApiUserStatusUrl()
      const { data } = await useFetchWithCredentials(url, { method: 'GET' }).json()
      const isChanged = setLoginStatus(data.value)

      if (!isChanged && extendSession) {
        onLoginChange(isLoggedIn.value)
      }
    } catch (error) {
      log(error)
    }
  }

  async function logOut(): Promise<void> {
    try {
      const url = useApiLogoutUrl()
      const { data } = await useFetchWithCredentials(url, { method: 'POST' }).json()
      setLoginStatus(data.value)
    } catch (error) {
      log(error)
    }
  }

  function setLoginStatus({ logged_in }: AuthResponse): boolean {
    const before = isLoggedIn.value
    isLoggedIn.value = logged_in
    return before !== isLoggedIn.value
  }

  function sessionRestore(): void | Promise<void> {
    const restore = sessionLifetimeStore.restoreSession()

    if (restore) {
      return logIn()
    }
  }

  function onLoginChange(isLoggedIn: boolean): void {
    // update session-cookie when isLoggedIn changes
    if (isLoggedIn) {
      sessionLifetimeStore.extendSession()
      deleteRouteCookie()
      return
    }

    sessionLifetimeStore.removeSession()

    // Possible fix for redirect to dus-i issue on logout
    // Cannot read properties of undefined (reading 'meta')
    if (route?.meta.public || route?.name === HOME) {
      return
    }

    // user is logged-out, return to home when route is not public
    router.push({ name: HOME })
  }

  function onAuthenticate(): void {
    openExternalLink(useApiLoginUrl())
  }

  watch(isLoggedIn, (isLoggedIn) => onLoginChange(isLoggedIn))

  on(SessionType.EXPIRING, () => logIn(true))

  on(SessionType.EXPIRED, () => onAuthenticate())

  return {
    sessionRestore,
    onAuthenticate,
    logIn,
    logOut,
    isLoggedIn
  }
})
