import { useRoute } from 'vue-router'
import { useApiDraftFormUrl } from '@shared/composables/useApiUrl'
import { useActiveForm } from '@shared/composables/form/useActiveForm'

export const useFormDraft = () => {
  const route = useRoute()
  const { setDraftId } = useActiveForm()

  async function createFormDraft() {
    const { id } = route.params
    const url = useApiDraftFormUrl(id as string)

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
