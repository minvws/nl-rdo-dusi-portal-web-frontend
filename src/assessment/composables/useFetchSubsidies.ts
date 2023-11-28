import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiUserSubsidiesUrl } from '@assessment/composables/useApiUrl'

import { formatSubsidiesData } from '@shared/utils/format'

export const useFetchSubsidies = () => {
  const url = useApiUserSubsidiesUrl()

  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? formatSubsidiesData(json.value.data) : []))

  return {
    data,
    ...fetch
  }
}
