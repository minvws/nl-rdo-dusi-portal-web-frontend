import type { Column } from '@shared/types/table'
import type { CaseHistory } from '@shared/types/case-history'

import { computed } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiCaseHistoryUrl } from '@assessment/composables/useApiUrl'

import { formatDateWithTime } from '@shared/utils/date'
import { TableDataType } from '@shared/types/table'
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
        type: TableDataType.STRING,
        text: formatDateWithTime(updatedAt, 'nl-NL')
      },
      action: {
        type: TableDataType.STRING,
        text: title
      },
      internalNote:
        (internalNote && {
          type: TableDataType.STRING,
          text: internalNote
        }) ||
        {},
      assessor: {
        type: TableDataType.STRING,
        text: assessorUser?.name ?? '-'
      }
    }
  })
}

export const useFetchCaseHistory = (id: string) => {
  const url = useApiCaseHistoryUrl(id)

  const { data: json, ...fetch } = useFetchWithCredentials(url).json()

  const data = computed(() => (json.value ? transform(json.value.data) : []))

  const columns = computed<Column[]>(() =>
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
