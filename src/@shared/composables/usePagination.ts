import type { Ref } from 'vue'
import type { PaginationItem } from '@shared/types/pagination'

import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'

export type Pagination = {
  items: Ref<PaginationItem[]>
  isFetching: Ref<boolean>
  page?: Ref<string | undefined>
  pageSize?: number
  routes: {
    overview: string
    pagination: string
  }
}

export const usePagination = ({ isFetching, page, items, routes, pageSize = 5 }: Pagination) => {
  const router = useRouter()

  const currentPage = computed<number>(() => {
    const isOverView = router.currentRoute.value.name === routes.overview
    const value = isOverView ? 0 : page?.value ? Number.parseInt(page.value, 10) : 0
    return Math.max(value, 1)
  })

  const slicedItems = computed<PaginationItem[]>(() => {
    const page = currentPage.value
    const from = (page - 1) * pageSize
    const to = page * pageSize
    return items.value.slice(from, to)
  })

  const total = computed<number>(() => items.value?.length ?? 0)

  const pages = computed<number>(() => Math.ceil(total.value / pageSize))

  function onPageChange(page: number) {
    page > 1
      ? router.push({ name: routes.pagination, params: { page } })
      : router.push({ name: routes.overview })
  }

  watch(isFetching, (isFetching) => {
    if (isFetching) return
    if (currentPage.value <= pages.value) return
    // when a page is greater then total pages, go to fist page
    onPageChange(0)
  })

  return {
    currentPage,
    onPageChange,
    pageSize,
    slicedItems,
    total
  }
}
