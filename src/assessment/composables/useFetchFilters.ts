import { computed } from 'vue'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'
import { useApiCasesFilterCountUrl } from '@assessment/composables/useApiUrl'

import { formatFiltersData } from '@shared/utils/format'

export const useFetchFilters = () => {
  const url = useApiCasesFilterCountUrl()
  const { data: json, ...fetch } = useFetchWithEncryption(url).json()

  const data = computed(() => (json.value ? formatFiltersData(json.value) : []))

  return {
    data,
    ...fetch
  }
}
