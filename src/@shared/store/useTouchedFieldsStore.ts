import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTouchedFieldsStore = defineStore('useTouchedFieldsStore', () => {
  const touched: Ref<Record<string, Record<string, boolean>>> = ref({})

  return {
    touched
  }
})
