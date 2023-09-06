import { useFetch, type MaybeRefOrGetter, type UseFetchOptions } from '@vueuse/core'

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const defaultOptions: Record<string, RequestCredentials> = { credentials: 'include' }
  const options = { ...defaultOptions, ...fetchOptions }

  return useFetch<T>(url, options, useFetchOptions)
}
