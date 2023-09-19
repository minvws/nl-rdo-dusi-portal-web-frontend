import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import { useApiMessageDetailsUrl } from '@portal/composables/useApiUrl'

export const useFetchMessageDetails = (id: string) => {
  const url = useApiMessageDetailsUrl(id)
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? json.value : []))

  return {
    data,
    ...fetch
  }
}
