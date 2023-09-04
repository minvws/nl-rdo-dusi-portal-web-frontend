import { computed } from 'vue'
import { useFileStore } from '@shared/store/useFileStore'
import { useTouchedFields } from '@shared/composables/form/useTouchedFields'
import { useTouchedForms } from '@shared/composables/form/useTouchedForms'
import { useFormStorage } from '@shared/store/useFormStorage'

export const useClearForm = (id: string) => {
  const activeForm = computed(() => ({ id }))
  const { clearTouchedFields } = useTouchedFields({ activeForm })
  const { clearTouchedForms } = useTouchedForms({ activeForm })
  const filesStore = useFileStore()
  const formStorage = useFormStorage()

  function clear() {
    clearTouchedFields(id)
    clearTouchedForms(id)
    filesStore.clearFiles(id)
    formStorage.clear(id)
  }
  return clear
}
