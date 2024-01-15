import type { CaseType } from '@shared/types/cases'

import { Case } from '@shared/types/cases'

import { computed } from 'vue'

import { useQueryFetch } from '@shared/composables/useQueryFetch'
import { useApiCasesUrl, useApiPersonalCasesUrl } from '@assessment/composables/useApiUrl'

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

  const { data: json, ...fetch } = useQueryFetch('with-credentials', { url }, { immediate: false })

  const data = computed(() => (json.value ? transformCasesData(json.value) : []))

  return {
    ...fetch,
    data
  }
}
