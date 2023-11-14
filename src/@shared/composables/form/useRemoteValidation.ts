import type { FormError, FormData } from '@/@shared/types/form'
import { watch, type ComputedRef, ref } from 'vue'

export const useRemoteValidation = (
  {
    data,
    createDraft,
    isValidationPending
  }: {
    errors: ComputedRef<FormError[]>
    createDraft: ComputedRef<boolean>
    data: ComputedRef<FormData>
    isValidationPending: ComputedRef<boolean | undefined>
  },
  onSubmitValidation: () => void
) => {
  const isDataChanged = ref(false)

  const onValidationChange = () => {
    if (!createDraft.value || isValidationPending.value || !isDataChanged.value) return
    isDataChanged.value = false
    return onSubmitValidation()
  }

  watch(
    data,
    (current, previous) => {
      const changed = JSON.stringify(current) !== JSON.stringify(previous)
      if (!changed) return
      isDataChanged.value = true
    },
    { deep: true }
  )

  return {
    onRemoteValidation: onValidationChange
  }
}
