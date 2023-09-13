import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import { useApiRequestDetailsUrl } from '@portal/composables/useApiUrl'

export const useFetchRequestDetails = (id: string) => {
  const url = useApiRequestDetailsUrl(id)
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? json.value : []))

  return {
    data,
    ...fetch
  }
}
