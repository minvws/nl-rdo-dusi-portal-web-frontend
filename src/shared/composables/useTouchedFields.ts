import type { Ref, ComputedRef } from 'vue'
import { computed, ref } from 'vue'

export const useTouchedFields = ({
  activeForm
}: {
  activeForm: ComputedRef<{ id: string; index: number }>
}) => {
  const touched: Ref<Record<string, Record<string, boolean>>> = ref({})

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
          setTouchedField(id, activeForm.value.id, value)
        },
        isTouched: computed(() => {
          return getTouchedField(id, activeForm.value.id)
        })
      }
    }
  }
}
