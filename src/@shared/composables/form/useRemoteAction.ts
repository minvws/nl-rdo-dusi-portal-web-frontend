import type { ComputedRef } from 'vue'
import type { FormData } from '@shared/types/form'

import { watch, ref } from 'vue'

type Props = {
  data: ComputedRef<FormData>
}

export const useRemoteAction = (props: Props, onSubmitAction: () => Promise<void>) => {
  const { data } = props
  const isDataChanged = ref<boolean>(false)

  async function onRemoteAction() {
    if (!isDataChanged.value) {
      return
    }

    isDataChanged.value = false
    await onSubmitAction()
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
    onRemoteAction
  }
}
