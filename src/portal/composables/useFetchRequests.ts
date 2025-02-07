import { computed } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'

import { useApiRequestsUrl } from '@portal/composables/useApiUrl'
import { transformRequestsData } from '@shared/utils/transform'

export const useFetchRequests = () => {
  const url = useApiRequestsUrl()
  const { data: json, ...fetch } = useCustomFetch('with-encryption', url).json()

  const data = computed(() => (json.value ? transformRequestsData(json.value) : []))

  return {
    data,
    ...fetch
  }
}
