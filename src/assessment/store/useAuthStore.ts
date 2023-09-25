import type { Ref } from 'vue'
import type { User } from '@shared/types/user'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { HOME, LOGIN_VIEW } from '@assessment/router/names'

export const useAuthStore = defineStore('useAuthStore', () => {
  const router = useRouter()

  const user: Ref<User | null> = ref(null)

  const isLoggedIn: Ref<boolean> = computed(() => user.value !== null)

  function hasRights(rights: number) {
    return isLoggedIn.value && user.value && user?.value?.rights >= rights
  }

  function logIn() {
    router.push({ name: HOME })
  }

  function logOut() {
    router.push({ name: LOGIN_VIEW })
  }

  return {
    isLoggedIn,
    hasRights,
    logIn,
    logOut
  }
})
