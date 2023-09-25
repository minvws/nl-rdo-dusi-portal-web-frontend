import type { Ref } from 'vue'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTouchedFormsStore = defineStore('useTouchedFormsStore', () => {
  const touched: Ref<Record<string, number[]>> = ref({})

  return {
    touched
  }
})
