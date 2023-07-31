import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import cookie from 'js-cookie'

import { useApiLogoutUrl } from '@/composables/useApiUrl'
import { HOME } from '@/router/names'

import { SESSION_COOKIE_NAME } from '@/constants'

export const useAuthStore = defineStore('useAuthStore', () => {
  const route = useRoute()
  const router = useRouter()
  const isLoggedIn = ref(false)

  async function logout() {
    const url = useApiLogoutUrl()

    try {
      const response = await fetch(url, { method: 'POST', credentials: 'include' })
      const data = await response.json()

      if (!data.logged_in) {
        setLoggedIn(false)
        cookie.remove(SESSION_COOKIE_NAME)
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (!route.meta.public) {
        router.push({ name: HOME })
      }
    }
  }

  function setLoggedIn(value: boolean) {
    isLoggedIn.value = value
  }

  return {
    logout,
    isLoggedIn,
    setLoggedIn
  }
})
