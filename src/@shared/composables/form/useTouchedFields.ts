import type { ComputedRef } from 'vue'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useTouchedFieldsStore } from '@shared/store/useTouchedFieldsStore'

export const useTouchedFields = ({ activeForm }: { activeForm: ComputedRef<{ id: string }> }) => {
  const touchedFieldsStore = useTouchedFieldsStore()
  const { touched } = storeToRefs(touchedFieldsStore)

  const getTouchedField = (id: string, formId: string) => {
    return !!touched.value?.[formId]?.[id]
  }

  const setTouchedField = (id: string, formId: string, value: boolean) => {
    if (!touched.value[formId]) touched.value[formId] = {}
    touched.value[formId][id] = value
  }

  const clearTouchedFields = (id?: string) => {
    if (!id) return
    delete touched.value?.[id]
  }

  return {
    setTouchedField,
    getTouchedField,
    clearTouchedFields,
    useTouchedField(id: string) {
      return {
        setTouchedField(value: boolean) {
          if (!activeForm.value?.id) return
          setTouchedField(id, activeForm.value.id, value)
        },
        isTouched: computed(() => {
          return getTouchedField(id, activeForm.value.id)
        })
      }
    }
  }
}
