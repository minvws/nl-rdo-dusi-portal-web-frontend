import { computed } from 'vue'

import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiCaseHistoryUrl } from '@assessment/composables/useApiUrl'

import { transformCaseHistoryData } from '@shared/utils/transform'

export const useFetchCaseHistory = (id: string) => {
  const url = useApiCaseHistoryUrl(id)

  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? transformCaseHistoryData(json.value.data) : []))

  return {
    data,
    ...fetch
  }
}
