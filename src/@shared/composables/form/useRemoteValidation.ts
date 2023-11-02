import type { FormError, FormData } from '@/@shared/types/form'
import { watch, type ComputedRef, ref } from 'vue'

export const useRemoteValidation = (
  {
    errors,
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
    if (
      errors.value?.length ||
      !createDraft.value ||
      isValidationPending.value ||
      !isDataChanged.value
    )
      return
    isDataChanged.value = false
    return onSubmitValidation()
  }

  watch(
    data,
    (now, before) => {
      const changed = JSON.stringify(now) !== JSON.stringify(before)
      if (!changed) return
      isDataChanged.value = true
    },
    { deep: true }
  )

  return {
    onRemoteValidation: onValidationChange
  }
}
