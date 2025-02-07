import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTouchedFormsStore = defineStore('useTouchedFormsStore', () => {
  const touched = ref<Record<string, number[]>>({})

  return {
    touched
  }
})
