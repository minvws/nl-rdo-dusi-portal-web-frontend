import { ref } from 'vue'
import { defineStore } from 'pinia'

const mockSignedIn = import.meta.env.VITE_MOCK_USER_IS_SIGNED_IN

export const useAuthStore = defineStore('useAuthStore', () => {
  const isLoggedIn = ref(mockSignedIn)

  return {
    isLoggedIn
  }
})
