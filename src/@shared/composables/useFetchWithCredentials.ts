import type { MaybeRefOrGetter, UseFetchOptions, AfterFetchContext } from '@vueuse/core'

import { useFetch } from '@vueuse/core'
import cookie from 'js-cookie'

import { useSessionLifetimeStore } from '@shared/store/useSessionLifetimeStore'

const useCredentials = !import.meta.env.PROD

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const sessionLifetimeStore = useSessionLifetimeStore()
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true, updateDataOnError: true }
  const defaultOptions: Record<string, RequestCredentials> = useCredentials
    ? { credentials: 'include' }
    : {}

  const token = cookie.get('XSRF-TOKEN')
  const headers = { headers: { ...fetchOptions?.headers, ...(token && { 'X-XSRF-TOKEN': token }) } }

  function afterFetch(ctx: AfterFetchContext) {
    sessionLifetimeStore.extendSession()
    return ctx
  }

  const fetchConfig: RequestInit = {
    ...defaultOptions,
    ...fetchOptions,
    ...headers
  }
  const useFetchConfig: UseFetchOptions = {
    ...defaultUseFetchOptions,
    ...useFetchOptions,
    afterFetch
  }

  return useFetch<T>(url, fetchConfig, useFetchConfig)
}
