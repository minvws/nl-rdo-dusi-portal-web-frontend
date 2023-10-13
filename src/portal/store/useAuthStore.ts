import type { Ref } from 'vue'
import type { AuthResponse } from '@shared/types/api-response'
import { SessionType } from '@shared/types/session'

import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { useApiLoginUrl, useApiLogoutUrl, useApiUserStatusUrl } from '@portal/composables/useApiUrl'
import { useSessionLifetimeStore } from '@shared/store/useSessionLifetimeStore'
import { useDispatcher } from '@shared/store/useDispatcher'

import { log } from '@shared/utils/logger'
import { deleteRouteCookie } from '@shared/utils/route-cookie'
import { openExternalLink } from '@shared/utils/link'

import { HOME } from '@shared/router/names'

export const useAuthStore = defineStore('useAuthStore', () => {
  const route = useRoute()
  const router = useRouter()
  const sessionLifetimeStore = useSessionLifetimeStore()
  const { on } = useDispatcher()

  const isLoggedIn: Ref<boolean> = ref(false)

  async function logIn(extendSession = false) {
    try {
      const url = useApiUserStatusUrl()
      const response = await fetch(url, { method: 'GET', credentials: 'include' })
      const loggedIn = await response.json()
      const isChanged = setLoginStatus(loggedIn)

      if (!isChanged && extendSession) {
        onLoginChange(isLoggedIn.value)
      }
    } catch (error) {
      log(error)
    }
  }

  async function logOut() {
    try {
      const url = useApiLogoutUrl()
      const response = await fetch(url, { method: 'POST', credentials: 'include' })
      setLoginStatus(await response.json())
    } catch (error) {
      log(error)
    }
  }

  function setLoginStatus({ logged_in }: AuthResponse) {
    const before = isLoggedIn.value
    isLoggedIn.value = logged_in
    return before !== isLoggedIn.value
  }

  function sessionRestore() {
    const restore = sessionLifetimeStore.restoreSession()

    if (restore) {
      return logIn()
    }
  }

  function onLoginChange(isLoggedIn: boolean) {
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

  function onAuthenticate() {
    openExternalLink(useApiLoginUrl())
  }

  watch(isLoggedIn, isLoggedIn => onLoginChange(isLoggedIn))

  on(SessionType.EXPIRING, () => {
    logIn(true)
  })

  on(SessionType.EXPIRED, () => {
    onAuthenticate()
  })

  return {
    sessionRestore,
    onAuthenticate,
    logIn,
    logOut,
    isLoggedIn
  }
})
