import type { MaybeRefOrGetter, UseFetchOptions, BeforeFetchContext } from '@vueuse/core'
import { useFetch } from '@vueuse/core'

import { useEncryption } from '@shared/composables/useEncryption'

const HEADER = import.meta.env.VITE_PUBLIC_KEY_HEADER

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const { generateKeys, getPublicKey } = useEncryption()
  const defaultOptions: Record<string, RequestCredentials> = { credentials: 'include' }
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true }

  async function beforeFetch({ options, cancel }: BeforeFetchContext) {
    const key = await generateKeys().then(() => getPublicKey())

    if (!key) {
      cancel()
    }

    options.headers = {
      ...options.headers,
      ...(key?.n && { [`${HEADER}`]: key.n })
    }

    return {
      options
    }
  }

  const config = { ...defaultOptions, beforeFetch, ...fetchOptions }
  console.log('config', config)
  const useFetchConfig = { ...defaultUseFetchOptions, ...useFetchOptions }
  console.log('useFetchConfig', useFetchConfig)
  return useFetch<T>(url, config, useFetchConfig)
}
