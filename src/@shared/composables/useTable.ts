import type { SortDirection, SortItem } from '@shared/types/sort'

import { computed, ref } from 'vue'

type Props = {
  data: any[]
  itemsPerPage?: number
}

export const useTable = ({ data, itemsPerPage }: Props) => {
  const sortingId = ref<string>('')
  const sortingDirection = ref<SortDirection>('ascending')
  const currentPage = ref<number>(1)

  const pageSize = computed<number>(() => itemsPerPage ?? 10)

  const paginatedData = computed<Record<string, unknown>[]>(() => {
    const offset = itemsPerPage ?? 0
    const start = (currentPage.value - 1) * offset
    const end = start + offset
    return sortedData.value.slice(start, end)
  })

  const sortedData = computed<Record<string, unknown>[]>(() => {
    const clonedData = [...data]

    if (sortingId.value) {
      clonedData.sort((a: any, b: any) => {
        const aValue = a[sortingId.value].text
        const bValue = b[sortingId.value].text

        if (aValue === bValue) {
          return 0
        }

        const asc = sortingDirection.value === 'ascending'

        if (asc) {
          return aValue < bValue ? -1 : 1
        } else {
          return aValue > bValue ? -1 : 1
        }
      })
    }

    return clonedData
  })

  const total = computed<number>(() => data.length)

  function onPageChange(page: number) {
    currentPage.value = page
  }

  function onSortingChange({ id, direction }: SortItem) {
    sortingId.value = id
    sortingDirection.value = direction
  }

  return {
    currentPage,
    pageSize,
    paginatedData,
    sortedData,
    sortingDirection,
    sortingId,
    total,
    onPageChange,
    onSortingChange
  }
}
