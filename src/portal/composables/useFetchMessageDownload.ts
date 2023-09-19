import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import { useApiMessageDownloadUrl } from '@portal/composables/useApiUrl'

export const useFetchMessageDownload = (id: string) => {
  const url = useApiMessageDownloadUrl(id, 'pdf')
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? json.value : []))

  return {
    data,
    ...fetch
  }
}
