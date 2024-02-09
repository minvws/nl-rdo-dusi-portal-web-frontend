import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTouchedFieldsStore = defineStore('useTouchedFieldsStore', () => {
  const touched = ref<Record<string, Record<string, boolean>>>({})

  return {
    touched
  }
})
