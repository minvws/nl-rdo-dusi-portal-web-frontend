import type { Ref } from 'vue'
import type { Form, FormData, FormError, FormValidationResult } from '@shared/types/form'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export type StoredForm = {
  forms: Form[]
  draftId?: string
  draftIsPending?: boolean
  validationResult?: FormValidationResult
  id: string
  index: number
  data: FormData[]
  errors: FormError[]
  isSubmitting?: boolean
  isValidationPending?: boolean
  validationId?: string
}

export const useFormStorage = defineStore('useFormStorage', () => {
  const storage = ref<Record<string, StoredForm>>({})

  function set(data: StoredForm) {
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
    }
  }

  return {
    storage,
    get,
    set,
    clear,
    update
  }
})
