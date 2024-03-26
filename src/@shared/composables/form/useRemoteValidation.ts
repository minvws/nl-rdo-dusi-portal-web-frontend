import type { ComputedRef } from 'vue'
import type { FormData } from '@shared/types/form'

import { watch, ref } from 'vue'

type Props = {
  data: ComputedRef<FormData>
  isValidationPending: ComputedRef<boolean | undefined>
}

export const useRemoteValidation = (
  props: Props,
  onSubmitValidation: (_id?: string) => Promise<void>
) => {
  const { data, isValidationPending } = props
  const isDataChanged = ref<boolean>(false)

  async function onRemoteValidation(id?: string) {
    if (isValidationPending.value || !isDataChanged.value) {
      return
    }

    isDataChanged.value = false
    await onSubmitValidation(id)
  }

  watch(
    data,
    (current, previous) => {
      const changed = JSON.stringify(current) !== JSON.stringify(previous)

      if (!changed) {
        return
      }

      isDataChanged.value = true
    },
    { deep: true }
  )

  return {
    onRemoteValidation
  }
}
