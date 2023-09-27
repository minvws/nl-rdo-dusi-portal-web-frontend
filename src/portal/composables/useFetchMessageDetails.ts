import { computed } from 'vue'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

import { useApiMessageDetailsUrl } from '@portal/composables/useApiUrl'

export const useFetchMessageDetails = (id: string) => {
  const url = useApiMessageDetailsUrl(id)
  const { data: json, ...fetch } = useFetchWithEncryption(url).json()

  const data = computed(() => (json.value ? json.value : []))

  return {
    data,
    ...fetch
  }
}
