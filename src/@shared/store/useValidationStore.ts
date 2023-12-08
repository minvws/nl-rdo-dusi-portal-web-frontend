import type { Ref } from 'vue'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useValidationStore = defineStore('useValidationStore', () => {
  const canContinueAfterValidation: Ref<boolean> = ref(false)

  return {
    canContinueAfterValidation
  }
})
