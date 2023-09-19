import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { HOME, LOGIN_VIEW } from '@assessment/router/names'

export const useAuthStore = defineStore('useAuthStore', () => {
  const router = useRouter()

  const isLoggedIn: Ref<boolean> = ref(true)

  function logIn() {
    isLoggedIn.value = true
    router.push({ name: HOME })
  }

  function logOut() {
    isLoggedIn.value = false
    router.push({ name: LOGIN_VIEW })
  }

  return {
    isLoggedIn,
    logIn,
    logOut
  }
})
