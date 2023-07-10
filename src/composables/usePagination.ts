import type { Ref, ComputedRef } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export const usePagination = ({
  page,
  pageSize = 5,
  messages,
  routes
}: {
  messages: ComputedRef<{ data: any } | undefined>
  page?: Ref<string | undefined>
  pageSize?: number
  routes: {
    overview: string
    pagination: string
  }
}) => {
  const router = useRouter()

  const currentPage = computed(() => {
    const value = page?.value ?? '1'
    return parseInt(value)
  })

  const data = computed(() => {
    return messages.value?.data ?? []
  })

  const items = computed(() =>
    data.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
  )
  const total = computed(() => data.value?.length ?? 0)

  const onPageChange = (page: number) => {
    if (page > 1) router.push({ name: routes.pagination, params: { page } })
    else router.push({ name: routes.overview })
  }

  return {
    items,
    total,
    currentPage,
    pageSize,
    onPageChange
  }
}
