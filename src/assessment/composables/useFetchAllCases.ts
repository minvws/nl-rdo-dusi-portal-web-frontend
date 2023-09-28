import type { Ref } from 'vue'
import type { FilterItem } from '@shared/types/filters'

import { computed, watch, ref } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiCasesUrl } from '@assessment/composables/useApiUrl'

import { transformCasesData } from '@shared/utils/transform'

export const useFetchAllCases = (filters: Ref<FilterItem[]>) => {
  const url = useApiCasesUrl()
  const params: Ref<Record<string, string> | undefined> = ref(undefined)
  const { data: json, ...fetch } = useQueryFetch(
    'with-credentials',
    { url, params },
    { immediate: false }
  )

  const data = computed(() => (json.value ? transformCasesData(json.value) : []))

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
