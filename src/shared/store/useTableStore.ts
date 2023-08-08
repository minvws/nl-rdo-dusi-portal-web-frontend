import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineStore } from 'pinia'

import type {
  FilterItem,
  FilterCountItem,
  FilterTabItem,
  TableData,
  TableDataRecord
} from '@/shared/type/table-types'

import formatTableData from '@/shared/util/format-table-data'

export const useTableStore = defineStore('useTableStore', () => {
  const data = ref({}) as Ref<TableData>
  const error = ref(null) as any
  const isFetching = ref(false)
  const selectedFilter = ref(null) as Ref<FilterTabItem | null>

  const { locale } = useI18n()

  function tranformData(data: []) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    } as Intl.DateTimeFormatOptions

    return formatTableData(data, locale.value, options)
  }

  async function fetchRequests(url: string) {
    isFetching.value = true

    try {
      const response = await fetch(url)
      const json = await response.json()
      const formattedData = tranformData(json) as TableData
      data.value = formattedData
    } catch (err) {
      // @TODO: handle error
      console.error(err)
      error.value = err
    }

    isFetching.value = false
  }

  const headings = computed(() => data.value.headings)

  const filterCounts = computed(() => {
    return data.value.filters.map((filter: FilterItem) => {
      const count = data.value.items.filter((item: TableDataRecord) => {
        return item.tags[filter.id] === filter.value
      }).length

      return {
        ...filter,
        count
      }
    }) as FilterCountItem[]
  })

  const filteredItems = computed(() => {
    if (!selectedFilter.value) {
      return data.value.items
    }

    const { id, value } = selectedFilter.value

    return data.value.items.filter((item: any) => {
      return item.tags[id] === value
    })
  })

  return {
    error,
    isFetching,
    data,
    fetchRequests,
    filterCounts,
    selectedFilter,
    filteredItems,
    headings
  }
})
