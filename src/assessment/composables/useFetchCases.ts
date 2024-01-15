import type { CaseType } from '@shared/types/cases'
import type { AssessmentsData } from '@shared/types/assessment'
import type { PaginationMetaData } from '@shared/types/pagination'

import { Case } from '@shared/types/cases'

import { computed } from 'vue'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiCasesUrl, useApiPersonalCasesUrl } from '@assessment/composables/useApiUrl'

import { transformCasesData, transformPaginationMetaData } from '@shared/utils/transform'

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

  const { data: json, ...fetch } = useQueryFetch('with-credentials', { url }, { immediate: false })

  const data = computed<AssessmentsData>(() => (json.value ? transformCasesData(json.value) : []))

  const paginationMeta = computed<PaginationMetaData | undefined>(() =>
    json.value ? transformPaginationMetaData(json.value) : undefined
  )

  return {
    ...fetch,
    data,
    paginationMeta
  }
}
