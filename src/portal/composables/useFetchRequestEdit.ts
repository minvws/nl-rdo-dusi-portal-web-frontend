import { useFetchForm } from '@shared/composables/form/useFetchForm'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import { useApiRequestDetailsUrl } from '@portal/composables/useApiUrl'

export const useFetchRequestEdit = (reference: string) => {
  const url = useApiRequestDetailsUrl(reference)
  const { data: json } = useFetchWithCredentials(url).json()

  if (!json.value) {
    return
  }

  const { form } = json.value

  return useFetchForm(form.id)
}
