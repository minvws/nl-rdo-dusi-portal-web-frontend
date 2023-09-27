import type { Ref } from 'vue'
import type { FilterItem } from '@shared/types/filters'

import { computed, ref, watch } from 'vue'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiPersonalCasesUrl } from '@assessment/composables/useApiUrl'

import { transformMyCasesData } from '@shared/utils/transform'

export const useFetchMyCases = (filters: Ref<FilterItem[]>) => {
  const url = useApiPersonalCasesUrl()
  const params: Ref<Record<string, string> | undefined> = ref(undefined)
  const { data: json, ...fetch } = useQueryFetch(
    'with-encryption',
    { url, params },
    { immediate: false }
  )

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
