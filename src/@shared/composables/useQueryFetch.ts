import { computed, ref, type Ref } from 'vue'
import { useFetch } from '@vueuse/core'

type Config = {
  refetch?: boolean
  immediate?: boolean
}

export const useQueryFetch = (
  { url: location, params }: { url: string; params?: Ref<Record<string, string> | undefined> },
  config?: Config
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

  const fetchConfig = { ...{ refetch: true, immediate: true }, ...config }
  const { data, error, isFetching } = useFetch(url, fetchConfig).json()

  return {
    query,
    data,
    error,
    isFetching
  }
}
