import type { Ref } from 'vue'

import { computed, ref } from 'vue'
import { useFetchWithEncryption } from '@shared/composables/useFetchWithEncryption'

type UseFetchConfig = {
  refetch?: boolean
  immediate?: boolean
}

type QueryFetch = {
  url: string
  params?: Ref<Record<string, string> | undefined>
}

export const useQueryFetch = (
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

  const { data, error, isFetching } = useFetchWithEncryption(
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
