import { computed, watch, type Ref, ref } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiAssessmentPersonalRequestsUrl } from '@/assessment/composables/useApiUrl'

import { transformMyAssessmentsData } from '@shared/utils/transform'
import type { FilterItem } from '@/@shared/types/filters'

export const useFetchMyAssessments = (filters: Ref<FilterItem[]>) => {
  const url = useApiAssessmentPersonalRequestsUrl()
  const params: Ref<Record<string, string> | undefined> = ref(undefined)
  const { data: json, ...fetch } = useQueryFetch({ url, params }, { immediate: false })
  const data = computed(() => (json.value ? transformMyAssessmentsData(json.value) : []))

  watch(filters, filters => {
    const id = filters?.[0]?.id
    params.value = { id }
  })

  return {
    data,
    params,
    ...fetch
  }
}
