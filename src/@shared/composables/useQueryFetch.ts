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
    const url = new URL(location)
    const requestParams = new URLSearchParams()
    const payload = { ...query?.value, ...params?.value }

    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => requestParams.append(key, item))
      } else if (value !== undefined) {
        requestParams.set(key, value)
      }
    })

    url.search = requestParams.toString()
    return url.toString()
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
