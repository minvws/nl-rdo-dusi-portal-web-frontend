import { computed } from 'vue'

import { useApiMessageDownloadUrl } from '@assessment/composables/useApiUrl'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

export const useFetchMessageDownload = (id: string) => {
  const url = useApiMessageDownloadUrl(id, 'pdf')
  const { data: json, ...fetch } = useFetchWithCredentials(url).blob()

  const data = computed(() => json.value || [])

  return {
    data,
    ...fetch
  }
}
