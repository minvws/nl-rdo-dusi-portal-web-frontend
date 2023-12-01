import type { Ref } from 'vue'
import { ref } from 'vue'

import { computed, watch } from 'vue'

import { useFetchSubsidies } from '@assessment/composables/useFetchSubsidies'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'
import { useApiIbanCheckUrl } from '@assessment/composables/useApiUrl'

import { TableDataType } from '@shared/types/table'
import { hasItems } from '@shared/utils/app-table'

import { translate } from '@shared/i18n'

import { MY_CASE_DETAILS } from '@assessment/router/names'

type IbanCheckItem = {
  applications: {
    id: string
    reference: string
  }[]
  count: string
  hash: string
}

const COLUMNS = {
  count: {
    sortable: true
  },
  applications: {
    sortable: false
  }
}

const transform = (data: IbanCheckItem[]) => {
  return data.map(({ count, applications }) => {
    return {
      count: {
        type: TableDataType.STRING,
        text: count
      },
      applications: {
        type: TableDataType.LINK_LIST,
        list: applications.map(({ id, reference }) => ({
          type: TableDataType.BUTTON_LINK,
          to: {
            name: MY_CASE_DETAILS,
            params: { id }
          },
          text: reference
        }))
      }
    }
  })
}

export const useFetchIbanCheck = () => {
  const selectedId: Ref<string> = ref('')
  const url: Ref<string> = computed(() => useApiIbanCheckUrl(selectedId.value))

  const {
    data: subsidies,
    error: subsidiesError,
    isFetching: isFetchingSubsidies
  } = useFetchSubsidies()

  const {
    data: json,
    execute,
    ...fetch
  } = useFetchWithCredentials(url, undefined, { immediate: false }).json()

  const data = computed(() => (json.value ? transform(json.value.data) : []))

  const columns = computed(() =>
    Object.entries(COLUMNS)
      .map(([id, { sortable }]) => ({
        id,
        sortable,
        text: translate(`component.ibanCheckColumn.${id}`)
      }))
      .filter(({ id }) => !!hasItems(data.value, id))
  )

  watch(selectedId, id => {
    selectedId.value = id
    execute()
  })

  return {
    data,
    columns,
    selectedId,
    subsidies,
    subsidiesError,
    isFetchingSubsidies,
    execute,
    ...fetch
  }
}
