import { Case, type CaseType } from '@shared/types/cases'

import type { Ref } from 'vue'

import { computed, ref, watch } from 'vue'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiCasesUrl, useApiPersonalCasesUrl } from '@assessment/composables/useApiUrl'
import { useFetchFilters } from '@assessment/composables/useFetchFilters'

import { transformCasesData } from '@shared/utils/transform'

const getUrl = ({ type }: { type: CaseType }) => {
  switch (type) {
    case Case.ALL_CASES:
      return useApiCasesUrl()
    case Case.MY_CASES:
      return useApiPersonalCasesUrl()
    default:
      throw new Error(`type "${type}" is not supported`)
  }
}

export const useFetchCases = (props: { type: CaseType }) => {
  const url = getUrl(props)

  const { data: filters, error: filtersError, isFetching: isFetchingFilters } = useFetchFilters()

  const params: Ref<Record<string, string> | undefined> = ref(undefined)

  const { data: json, ...fetch } = useQueryFetch(
    'with-credentials',
    { url, params },
    { immediate: false }
  )

  const data = computed(() => (json.value ? transformCasesData(json.value) : []))

  watch(filters, filters => {
    const filter = filters?.[0]
    if (!filter) {
      delete params.value?.id
      return
    }
    const { id } = filter
    params.value = { id }
  })

  return {
    ...fetch,
    data,
    filters,
    filtersError,
    isFetchingFilters,
    params
  }
}
