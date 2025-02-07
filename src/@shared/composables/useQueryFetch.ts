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

  const url = computed<string>(() => {
    const payload = { ...query?.value, ...params?.value }
    const entries = Object.entries(payload).filter(([, value]) => !!value)

    if (entries.length === 0) return location

    const queryString = entries
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length === 0) return ''
          return value.map((v) => `${key}[]=${encodeURIComponent(v)}`).join('&')
        } else {
          return `${key}=${encodeURIComponent(value)}`
        }
      })
      .filter((value) => !!value)
      .join('&')
    if (!queryString) return location
    return `${location}?${queryString}`
  })

  const fetchOptions = { ...fetchConfig }
  const useFetchOptions = {
    refetch: true,
    immediate: true,
    ...useFetchConfig
  }

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
