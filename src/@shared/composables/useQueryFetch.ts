import { computed, ref, type Ref } from 'vue'
import { useFetchWithCredentials } from '@shared/composables/useFetchWithCredentials'

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
  fetchConfig?: RequestInit,
  useFetchConfig?: UseFetchConfig
) => {
  const query: Ref<Record<string, string | string[]>> = ref({})

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

  const { data, error, isFetching } = useFetchWithCredentials(
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
