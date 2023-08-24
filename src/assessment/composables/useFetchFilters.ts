import { computed } from 'vue'
import { useFetch } from '@vueuse/core'

import { useApiAssessmentFilterCountUrl } from '@/assessment/composables/useApiUrl'

import { formatFiltersData } from '@shared/utils/format'

export const useFetchFilters = () => {
  const url = useApiAssessmentFilterCountUrl()
  const { data: json, ...rest } = useFetch(url).json()

  const data = computed(() => (json.value ? formatFiltersData(json.value) : []))

  return { data, ...rest }
}
