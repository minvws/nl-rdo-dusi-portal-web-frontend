import { computed } from 'vue'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiAssessmentRequestsUrl } from '@/assessment/composables/useApiUrl'

import { transformAssessmentsData } from '@shared/utils/transform'

export const useFetchAllAssessments = () => {
  const url = useApiAssessmentRequestsUrl()
  const { data: json, ...rest } = useQueryFetch(url)

  const data = computed(() => (json.value ? transformAssessmentsData(json.value) : []))

  return { data, ...rest }
}
