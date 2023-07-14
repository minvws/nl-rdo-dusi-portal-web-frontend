import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { useApiLogoutUrl } from '@/composables/useApiUrl'
import { HOME } from '@/router/names'

export const useAuthStore = defineStore('useAuthStore', () => {
  const route = useRoute()
  const router = useRouter()
  const isLoggedIn = ref(false)

  async function logout() {
    const url = useApiLogoutUrl()

    try {
      const response = await fetch(url, { method: 'post', credentials: 'include' })
      const data = await response.json()

      isLoggedIn.value = data.logged_in
    } catch (error) {
      console.error(error)
    } finally {
      if (!route.meta.public) {
        router.push({ name: HOME })
      }
    }
  }

  return {
    logout,
    isLoggedIn
  }
})
