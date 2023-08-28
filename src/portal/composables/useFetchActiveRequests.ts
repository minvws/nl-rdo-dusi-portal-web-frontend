import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiActiveRequestsUrl } from '@/portal/composables/useApiUrl'
import { transformRequestsData } from '@shared/utils/transform'

export const useFetchActiveRequests = () => {
  const url = useApiActiveRequestsUrl()
  const { data: json, ...fetch } = useFetch(url).json()

  const data = computed(() => (json.value ? transformRequestsData(json.value) : []))

  return {
    data,
    ...fetch
  }
}
