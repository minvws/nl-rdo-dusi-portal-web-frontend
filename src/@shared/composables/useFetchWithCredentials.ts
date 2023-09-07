import type { MaybeRefOrGetter, UseFetchOptions, BeforeFetchContext } from '@vueuse/core'
import { useFetch } from '@vueuse/core'

import { useEncryption } from '@shared/composables/useEncryption'

import { log } from '@shared/utils/logger'

const HEADER = import.meta.env.VITE_PUBLIC_KEY_HEADER

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const { generateKeyPair, getPublicKey } = useEncryption()
  const defaultOptions: Record<string, RequestCredentials> = { credentials: 'include' }
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true }

  // Reference: https://vueuse.org/core/useFetch/#intercepting-a-request
  async function beforeFetch({ options, cancel }: BeforeFetchContext) {
    try {
      await generateKeyPair()
      const key = await getPublicKey()
      const publicKey = key?.n

      if (!publicKey) {
        log('Key generation failed, not adding public key')
        cancel()
      }

      options.headers = {
        ...options.headers,
        ...(publicKey && { [`${HEADER}`]: btoa(publicKey) })
      }

      return {
        options
      }
    } catch (error) {
      log('Key generation failed, not adding public key', error)
      cancel()
    }
  }

  const fetchConfig = { ...defaultOptions, ...fetchOptions }
  const useFetchConfig = { ...defaultUseFetchOptions, ...useFetchOptions, beforeFetch }

  return useFetch<T>(url, fetchConfig, useFetchConfig)
}
