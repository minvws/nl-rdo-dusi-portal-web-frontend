import type { ComputedRef } from 'vue'

import { watch, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useTouchedFormsStore } from '@shared/store/useTouchedFormsStore'

export const useTouchedForms = ({
  formKey,
  activeForm
}: {
  formKey?: ComputedRef<string>
  activeForm: ComputedRef<{ id: string; index?: number }>
}) => {
  const touchedFormsStore = useTouchedFormsStore()
  const { touched } = storeToRefs(touchedFormsStore)

  const touchedForms = computed<number[] | undefined>(() =>
    activeForm.value?.id ? touched.value[activeForm.value.id] : undefined
  )

  function clearTouchedForms(id?: string) {
    if (id) {
      delete touched.value[id]
    }
  }

  if (formKey) {
    watch(
      () => formKey.value,
      () => {
        const form = activeForm.value
        if (!form) return
        if (!touchedForms.value) touched.value[activeForm.value.id] = []
        const { index } = form
        if (index === undefined) return
        if (!touchedForms.value?.includes(index)) {
          touchedForms.value?.push(index)
        }
      },
      { immediate: true }
    )
  }

  return {
    touchedForms,
    clearTouchedForms
  }
}
