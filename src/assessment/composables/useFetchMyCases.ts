import { computed, watch, type Ref, ref } from 'vue'
import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiPersonalCasesUrl } from '@/assessment/composables/useApiUrl'

import { transformMyCasesData } from '@shared/utils/transform'
import type { FilterItem } from '@shared/types/filters'

export const useFetchMyCases = (filters: Ref<FilterItem[]>) => {
  const url = useApiPersonalCasesUrl()
  const params: Ref<Record<string, string> | undefined> = ref(undefined)
  const { data: json, ...fetch } = useQueryFetch({ url, params }, { immediate: false })

  const data = computed(() => (json.value ? transformMyCasesData(json.value) : []))

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
