import type { Ref } from 'vue'

import { computed, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiAssessorPoolUrl } from '@assessment/composables/useApiUrl'

export const useFetchAssessors = (id: string) => {
  const searchQuery: Ref<string> = ref('')
  const url = useApiAssessorPoolUrl(id)
  const params: Ref<Record<string, string>> = ref({})

  const updateParams = useDebounceFn(query => {
    params.value = { search: query }
  }, 500)

  const { data: json, ...fetch } = useQueryFetch('with-credentials', { url, params })

  const data = computed(() => (json.value ? json.value.data : {}))

  watch(searchQuery, query => updateParams(query))

  return {
    data,
    searchQuery,
    ...fetch
  }
}
