import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useValidationStore = defineStore('useValidationStore', () => {
  const canContinueAfterValidation = ref<boolean>(false)

  return {
    canContinueAfterValidation
  }
})
