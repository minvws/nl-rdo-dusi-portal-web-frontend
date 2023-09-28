import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiCasesFilterCountUrl } from '@assessment/composables/useApiUrl'

import { formatFiltersData } from '@shared/utils/format'

export const useFetchFilters = () => {
  const url = useApiCasesFilterCountUrl()
  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? formatFiltersData(json.value) : []))

  return {
    data,
    ...fetch
  }
}
