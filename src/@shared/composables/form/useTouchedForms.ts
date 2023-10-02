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
  const { touched } = storeToRefs(useTouchedFormsStore())

  const touchedForms = computed(() => {
    const id = activeForm.value.id
    if (!id) return undefined
    return touched.value[id]
  })

  const clearTouchedForms = (id?: string) => {
    if (!id) return
    delete touched.value[id]
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
