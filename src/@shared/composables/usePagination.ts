import type { Ref } from 'vue'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'

type Pagination = {
  items: Ref<[]>
  page?: Ref<string | undefined>
  pageSize?: number
  routes: {
    overview: string
    pagination: string
  }
}

export const usePagination = ({ page, pageSize = 5, items, routes }: Pagination) => {
  const router = useRouter()

  const currentPage = computed(() => (page?.value ? parseInt(page.value) : 1))

  const slicedItems = computed(() =>
    items.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
  )

  const total = computed(() => items.value?.length ?? 0)

  function onPageChange(page: number) {
    page > 1
      ? router.push({ name: routes.pagination, params: { page } })
      : router.push({ name: routes.overview })
  }

  watch(items, () => {
    // when items change, go to the first page
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
