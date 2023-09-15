import type { Ref } from 'vue'
import { useApiDraftFormUrl } from '@shared/composables/useApiUrl'
import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useFetchWithCredentials } from "@shared/composables/useFetchWithCredentials"

export const useFormDraft = (formId: Ref<string>) => {
  const { setDraftId } = useActiveForm()

  async function createFormDraft() {
    const id = formId.value
    const url = useApiDraftFormUrl(id)

    const options: RequestInit = {
      method: 'POST',
      credentials: 'include'
    }

    const data = await useFetchWithCredentials(url, options).json()
    setDraftId(data.data.value.reference)
  }

  return {
    createFormDraft
  }
}
