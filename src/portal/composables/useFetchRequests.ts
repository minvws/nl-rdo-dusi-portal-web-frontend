import { computed } from 'vue'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

import { useApiRequestsUrl } from '@portal/composables/useApiUrl'
import { transformRequestsData } from '@shared/utils/transform'

export const useFetchRequests = () => {
  const url = useApiRequestsUrl()
  const { data: json, ...fetch } = useFetchWithEncryption(url).json()

  const data = computed(() => (json.value ? transformRequestsData(json.value) : []))

  return {
    data,
    ...fetch
  }
}
