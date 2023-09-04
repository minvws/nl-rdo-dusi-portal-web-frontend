import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useTouchedFormsStore = defineStore('useTouchedFormsStore', () => {
  const touched: Ref<Record<string, number[]>> = ref({})

  return {
    touched
  }
})
