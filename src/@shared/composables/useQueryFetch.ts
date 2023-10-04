import type { Ref } from 'vue'

import { computed, ref } from 'vue'
import { useCustomFetch } from '@shared/composables/useCustomFetch'

type UseFetchConfig = {
  refetch?: boolean
  immediate?: boolean
}

type QueryFetch = {
  url: string
  params?: Ref<Record<string, string> | undefined>
}

export const useQueryFetch = (
  type: 'with-credentials' | 'with-encryption',
  { url: location, params }: QueryFetch,
  useFetchConfig?: UseFetchConfig,
  fetchConfig?: RequestInit
) => {
  const query: Ref<Record<string, string | string[]> | undefined> = ref(undefined)

  const url = computed(() => {
    const payload = { ...query?.value, ...params?.value }
    const entries = Object.entries(payload)

    if (!entries.length) return location

    const queryString = entries
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map(v => `${key}[]=${encodeURIComponent(v)}`)
            .join('&')
            .substring(-1)
        } else {
          return `${key}=${encodeURIComponent(value)}`
        }
      })
      .join('&')

    return `${location}?${queryString}`
  })

  const fetchOptions = { ...fetchConfig }
  const useFetchOptions = { ...{ refetch: true, immediate: true }, ...useFetchConfig }

  const { data, error, isFetching } = useCustomFetch(
    type,
    url,
    fetchOptions,
    useFetchOptions
  ).json()

  return {
    query,
    data,
    error,
    isFetching
  }
}
