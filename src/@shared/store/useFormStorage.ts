import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Form, FormData, FormError } from '@shared/types/form'

type StoredForm = {
  forms: Form[]
  draftId?: string
  id: string
  index: number
  data: FormData[]
  errors: FormError[]
  isSubmitting?: boolean
}

export const useFormStorage = defineStore('useFormStorage', () => {
  const storage: Ref<Record<string, StoredForm>> = ref({})

  const set = (data: StoredForm) => (storage.value[data.id] = data)

  const get = (id: string) => storage.value[id]

  const update = (id: string, props: any) => Object.assign(get(id), props)

  const clear = (id?: string) => {
    if (!id) return
    delete storage.value[id]
  }

  return {
    storage,
    get,
    set,
    clear,
    update
  }
})
