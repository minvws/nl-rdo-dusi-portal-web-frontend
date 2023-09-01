import { useFetch, type MaybeRefOrGetter, type UseFetchOptions } from '@vueuse/core'

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  options?: UseFetchOptions
) => {
  return useFetch<T>(url, { credentials: 'include' }, options)
}
