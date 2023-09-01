import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import { useApiSubsidyUrl } from '@/portal/composables/useApiUrl'

export const useFetchSubsidies = () => {
  const url = useApiSubsidyUrl()
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? json.value : []))

  return {
    data,
    ...fetch
  }
}
