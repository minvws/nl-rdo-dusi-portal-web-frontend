import { ref, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useApiLogoutUrl, useApiUserStatusUrl } from '@shared/composables/useApiUrl'
import { getSessionCookie, removeSessionCookie, setSessionCookie } from '@shared/utils/cookie'
import { log } from '@shared/utils/logger'
import { HOME } from '@shared/router/names'
import type { LogInResponse, LogOutResponse } from '@shared/types//api-response'

export const useAuthStore = defineStore('useAuthStore', () => {
  const route = useRoute()
  const router = useRouter()

  const isLoggedIn: Ref<boolean> = ref(false)
  const init = ref(false)

  async function logIn() {
    try {
      const url = useApiUserStatusUrl()
      const response = await fetch(url, { method: 'GET', credentials: 'include' })
      setLoginStatus(await response.json())
    } catch (error) {
      log('log-in error', error)
    }
  }

  async function logOut() {
    try {
      const url = useApiLogoutUrl()
      const response = await fetch(url, { method: 'POST', credentials: 'include' })
      setLoginStatus(await response.json())
    } catch (error) {
      log('log-out error', error)
    }
  }

  function setLoginStatus({ logged_in }: LogInResponse | LogOutResponse) {
    isLoggedIn.value = logged_in
  }

  function restoreSession() {
    if (init.value) return
    init.value = true
    if (getSessionCookie()) {
      return logIn()
    }
  }

  // update session-cookie when isLoggedIn changes
  watch(isLoggedIn, isLoggedIn => {
    if (isLoggedIn) {
      setSessionCookie()
      return
    }
    removeSessionCookie()
    if (route.meta.public) {
      return
    }
    if (route.name === HOME) {
      return
    }
    // user is logged-out, return to home when route is not public
    router.push({ name: HOME })
  })

  return {
    restoreSession,
    logIn,
    logOut,
    isLoggedIn
  }
})
