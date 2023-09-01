import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

import { useApiActiveRequestsUrl } from '@/portal/composables/useApiUrl'
import { transformRequestsData } from '@shared/utils/transform'

export const useFetchActiveRequests = () => {
  const url = useApiActiveRequestsUrl()
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? transformRequestsData(json.value) : []))

  return {
    data,
    ...fetch
  }
}
