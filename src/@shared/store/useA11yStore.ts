import { ref } from 'vue'
import { defineStore } from 'pinia'

// Store is used to create and keep track of form id for accessibility purposes.
export const useA11yStore = defineStore('useA11yStore', () => {
  const formIds = ref<string[]>([])

  function addId(id: string): void {
    if (!formIds.value.includes(id)) {
      formIds.value.push(id)
    }
  }

  function getA11yErrorId(id: string, index?: number): string {
    return index ? `${id}-${index}-error` : `${id}-error`
  }

  function getA11yExplanationId(id: string, index?: number): string {
    return index ? `${id}-${index}-explanation` : `${id}-explanation`
  }

  function getA11yInputId(id: string, index?: number): string {
    return index ? `${id}-${index}-input` : `${id}-input`
  }

  function getA11yValidationId(id: string, index?: number): string {
    return index ? `${id}-${index}-validation-result` : `${id}-validation-result`
  }

  function removeId(id: string): void {
    formIds.value = formIds.value.filter((item: string) => item !== id)
  }

  return {
    formIds,
    addId,
    getA11yErrorId,
    getA11yExplanationId,
    getA11yInputId,
    getA11yValidationId,
    removeId
  }
})
