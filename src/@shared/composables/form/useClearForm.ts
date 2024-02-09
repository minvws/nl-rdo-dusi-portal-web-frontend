import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { useFileStore } from '@shared/store/useFileStore'
import { useTouchedFields } from '@shared/composables/form/useTouchedFields'
import { useTouchedForms } from '@shared/composables/form/useTouchedForms'
import { useFormStorage } from '@shared/store/useFormStorage'

export const useClearForm = (id: ComputedRef<string>) => {
  const filesStore = useFileStore()
  const formStorage = useFormStorage()

  const activeForm = computed<{ id: string }>(() => ({ id: id.value }))

  const { clearTouchedFields } = useTouchedFields({ activeForm })
  const { clearTouchedForms } = useTouchedForms({ activeForm })

  function clear() {
    clearTouchedFields(id.value)
    clearTouchedForms(id.value)
    filesStore.clearFiles(id.value)
    formStorage.clear(id.value)
  }

  return {
    clear
  }
}
