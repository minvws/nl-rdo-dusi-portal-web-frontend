import { computed } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'

import { useApiCaseDetailsUrl } from '@assessment/composables/useApiUrl'

import { formatCaseData } from '@shared/utils/format'

export const useFetchCase = (id: string) => {
  const url = useApiCaseDetailsUrl(id)
  const { data: json, ...fetch } = useQueryFetch({ url })

  const data = computed(() => (json.value ? formatCaseData(json.value.data) : null))

  return { data, ...fetch }
}
