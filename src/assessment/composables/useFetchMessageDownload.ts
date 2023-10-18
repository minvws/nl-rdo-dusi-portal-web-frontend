import { computed } from 'vue'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

import { useApiMessageDownloadUrl } from '@assessment/composables/useApiUrl'

export const useFetchMessageDownload = (id: string) => {
  const url = useApiMessageDownloadUrl(id, 'pdf')
  const { data: json, ...fetch } = useFetchWithEncryption(url).blob()

  const data = computed(() => (json.value ? json.value : []))

  return {
    data,
    ...fetch
  }
}
