import type { CaseHistory } from '@shared/types/case-history'

import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiCaseHistoryUrl } from '@assessment/composables/useApiUrl'

import { formatDateWithTime } from '@shared/utils/date'
import { AssessmentsDataType } from '@shared/types/table'
import { hasItems } from '@shared/utils/app-table'
import { translate } from '@shared/i18n'

const COLUMNS = {
  updatedAt: {
    sortable: true
  },
  action: {
    sortable: false
  },
  internalNote: {
    sortable: false
  },
  assessor: {
    sortable: true
  }
}
const transform = (data: CaseHistory[]) => {
  return data.map(({ updatedAt, subsidyStage: { title }, assessorUser, internalNote }) => {
    return {
      updatedAt: {
        type: AssessmentsDataType.STRING,
        text: formatDateWithTime(updatedAt, 'nl-NL')
      },
      action: {
        type: AssessmentsDataType.STRING,
        text: title
      },
      internalNote:
        (internalNote && {
          type: AssessmentsDataType.STRING,
          text: internalNote
        }) ||
        {},
      assessor: {
        type: AssessmentsDataType.STRING,
        text: assessorUser?.name ?? '-'
      }
    }
  })
}

export const useFetchCaseHistory = (id: string) => {
  const url = useApiCaseHistoryUrl(id)

  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? transform(json.value.data) : []))

  const columns = computed(() =>
    Object.entries(COLUMNS)
      .map(([id, { sortable }]) => ({
        id,
        sortable,
        text: translate(`component.caseHistoryColumn.${id}`)
      }))
      .filter(({ id }) => !!hasItems(data.value, id))
  )

  return {
    data,
    columns,
    ...fetch
  }
}
