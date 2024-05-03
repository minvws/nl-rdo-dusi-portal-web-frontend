import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { useTouchedFields } from '@shared/composables/form/useTouchedFields'
import { useTouchedForms } from '@shared/composables/form/useTouchedForms'
import { useFormStorage } from '@shared/store/useFormStorage'
import { usePendingFileStore } from '@shared/store/usePendingFileStore'

export const useClearForm = (id: ComputedRef<string>) => {
  const pendingFileStore = usePendingFileStore()
  const formStorage = useFormStorage()

  const activeForm = computed<{ id: string }>(() => ({ id: id.value }))

  const { clearTouchedFields } = useTouchedFields({ activeForm })
  const { clearTouchedForms } = useTouchedForms({ activeForm })

  function clear() {
    clearTouchedFields(id.value)
    clearTouchedForms(id.value)
    pendingFileStore.clearPendings({ formId: id.value })
    formStorage.clear(id.value)
  }

  return {
    clear
  }
}
