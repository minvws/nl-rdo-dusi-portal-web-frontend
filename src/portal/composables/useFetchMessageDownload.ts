import { computed } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'

import { useApiMessageDownloadUrl } from '@portal/composables/useApiUrl'

export const useFetchMessageDownload = (id: string) => {
  const url = useApiMessageDownloadUrl(id, 'pdf')
  const { data: json, ...fetch } = useCustomFetch('with-encryption', url, undefined).blob()

  const data = computed(() => json.value || [])

  return {
    data,
    ...fetch
  }
}
