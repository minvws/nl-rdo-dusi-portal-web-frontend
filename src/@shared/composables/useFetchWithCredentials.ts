import type { MaybeRefOrGetter, UseFetchOptions, BeforeFetchContext, AfterFetchContext } from "@vueuse/core"
import { useFetch } from '@vueuse/core'

import { useEncryption } from '@shared/composables/useEncryption'

import { log } from '@shared/utils/logger'

const HEADER = import.meta.env.VITE_PUBLIC_KEY_HEADER

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const { generateKeyPair, getPublicKey, decrypt } = useEncryption()
  const defaultOptions: Record<string, RequestCredentials> = { credentials: 'include' }
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true }

  let keyPair: CryptoKeyPair|undefined = undefined;

  // Reference: https://vueuse.org/core/useFetch/#intercepting-a-request
  async function beforeFetch({ options, cancel }: BeforeFetchContext) {
    try {
      keyPair = await generateKeyPair()
      if (!keyPair) {
        log('Key pair generation failed, not adding public key')
        cancel()
        return { options }
      }

      const publicKey = await getPublicKey(keyPair)

      if (!publicKey) {
        log('Key generation failed, not adding public key')
        cancel()
        return { options }
      }

      let encodedPublicKey = btoa(String.fromCharCode(...new Uint8Array(publicKey)))
      encodedPublicKey = encodedPublicKey?.match(/.{1,64}/g)?.join('\n') ?? ''
      encodedPublicKey = `-----BEGIN PUBLIC KEY-----\n${encodedPublicKey}\n-----END PUBLIC KEY-----`
      log('Public key', encodedPublicKey)

      options.headers = {
        ...options.headers,
        ...(encodedPublicKey && { [`${HEADER}`]: btoa(encodedPublicKey) })
      }

      return {
        options
      }
    } catch (error) {
      log('Key generation failed, not adding public key', error)
      cancel()
    }
  }

  async function afterFetch(ctx: AfterFetchContext) {
    if (!keyPair?.privateKey) {
      return ctx
    }

    log(ctx.data)

    ctx.data = decrypt(keyPair.privateKey, ctx.data)
    return ctx
  }

  const fetchConfig = { ...defaultOptions, ...fetchOptions }
  const useFetchConfig = { ...defaultUseFetchOptions, ...useFetchOptions, beforeFetch, afterFetch }

  return useFetch<T>(url, fetchConfig, useFetchConfig)
}
