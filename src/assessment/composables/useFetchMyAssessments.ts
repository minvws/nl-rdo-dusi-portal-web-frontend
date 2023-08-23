import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiAssessmentPersonalRequestsUrl } from '@/assessment/composables/useApiUrl'
import { transformMyAssessmentsData } from '@shared/utils/transform'

export const useFetchMyAssessments = () => {
  const url = useApiAssessmentPersonalRequestsUrl()
  const { data: json, ...fetch } = useQueryFetch(url)

  const data = computed(() => (json.value ? transformMyAssessmentsData(json.value) : undefined))

  return {
    data,
    ...fetch
  }
}
