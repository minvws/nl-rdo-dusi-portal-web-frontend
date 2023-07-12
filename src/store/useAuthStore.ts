import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useApiUserStatusUrl, useApiLogoutUrl } from '@/composables/useApiUrl'

export const useAuthStore = defineStore('useAuthStore', () => {
  const isLoggedIn = ref(false)

  function checkUserStatus() {
    const url = useApiUserStatusUrl()

    fetch(url, { credentials: 'include' })
      .then(response => response.json())
      .then(data => isLoggedIn.value = data.logged_in)
  }

  function logout() {
    const url = useApiLogoutUrl()

    fetch(url, { method: 'post', credentials: 'include' })
      .then(response => response.json())
      .then(data => isLoggedIn.value = data.logged_in)
  }

  return {
    checkUserStatus,
    logout,
    isLoggedIn,
  }
})
