import type { Form, FormData, FormErrors, FormValidationResult } from '@shared/types/form'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export type StoredForm = {
  forms: Form[]
  reference?: string
  validationResult?: FormValidationResult
  id: string
  index: number
  data: FormData[]
  errors: FormErrors
  isSubmitting?: boolean
  isValidationPending?: boolean
  validationId?: string
}

export const useFormStorage = defineStore('useFormStorage', () => {
  const formIds = ref<string[]>([])
  const storage = ref<Record<string, StoredForm>>({})

  function set(data: StoredForm) {
    if (!formIds.value.includes(data.id)) {
      formIds.value.push(data.id)
    }

    storage.value[data.id] = data
  }

  function get(id: string) {
    return storage.value[id]
  }

  function update(id: string, props: any) {
    const form = get(id)
    if (!form) return
    Object.assign(form, props)
  }

  function clear(id?: string) {
    if (id) {
      delete storage.value[id]
      formIds.value = formIds.value.filter((formId) => formId !== id)
    }
  }

  function clearAll() {
    storage.value = {}
    formIds.value = []
  }

  return {
    formIds,
    storage,
    get,
    set,
    clear,
    clearAll,
    update
  }
})
