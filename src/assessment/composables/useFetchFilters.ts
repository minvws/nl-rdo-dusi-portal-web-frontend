import { computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { useApiAssessmentFilterCountUrl } from '@/assessment/composables/useAssessmentApiUrl'

import { formatFiltersData } from '@shared/utils/format'

export const useFetchFilters = () => {
  const url = useApiAssessmentFilterCountUrl()
  const { data: json, error, isFetching } = useFetch(url).json()

  const data = computed(() => (json.value ? formatFiltersData(json.value) : []))

  return {
    data,
    error,
    isFetching
  }
}
