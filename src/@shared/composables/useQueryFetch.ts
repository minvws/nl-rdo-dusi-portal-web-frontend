import { computed, ref, type Ref } from 'vue'
import { useFetch } from '@vueuse/core'

export const useQueryFetch = (location: string, config = { refetch: true }) => {
  const query: Ref<Record<string, string | string[]>> = ref({})

  const url = computed(() => {
    try {
      const url = new URL(location)
      const params = new URLSearchParams()

      if (query?.value) {
        Object.entries(query.value).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item))
          } else params.set(key, value)
        })
      }

      url.search = params.toString()

      return url.toString()
    } catch (e) {
      return location
    }
  })

  const { data, error, isFetching } = useFetch(url, config).json()

  return {
    query,
    data,
    error,
    isFetching
  }
}
