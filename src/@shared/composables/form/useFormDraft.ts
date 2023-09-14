import type { Ref } from 'vue'
import { useApiDraftFormUrl } from '@shared/composables/useApiUrl'
import { useActiveForm } from '@shared/composables/form/useActiveForm'

export const useFormDraft = (formId: Ref<string>) => {
  const { setDraftId } = useActiveForm()

  async function createFormDraft() {
    const id = formId.value
    const url = useApiDraftFormUrl(id)

    const options: RequestInit = {
      method: 'POST',
      credentials: 'include'
    }

    const response = await fetch(url, options)
    const data = await response.json()

    setDraftId(data.id)
  }

  return {
    createFormDraft
  }
}
