import { useRoute } from 'vue-router'
import { useApiDraftFormUrl } from '@shared/composables/useApiUrl'
import { useActiveForm } from '@shared/composables/form/useActiveForm'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

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

    const data = await useFetchWithCredentials(url, options).json()
    setDraftId(data.data.value.reference)
  }

  return {
    createFormDraft
  }
}
