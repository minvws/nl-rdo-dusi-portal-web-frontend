import { computed } from 'vue'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

import { useApiRequestDetailsUrl } from '@portal/composables/useApiUrl'

export const useFetchRequestStatus = (reference: string) => {
  const url = useApiRequestDetailsUrl(reference)
  const { data: json, ...fetch } = useFetchWithEncryption(url).json()

  const data = computed(() => (json.value ? json.value : {}))
  const values = computed(() => data.value?.data)

  return {
    data,
    values,
    ...fetch
  }
}
