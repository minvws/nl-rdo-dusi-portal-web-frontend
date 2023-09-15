import type {
  MaybeRefOrGetter,
  UseFetchOptions,
  BeforeFetchContext,
  AfterFetchContext
} from '@vueuse/core'
import { useFetch } from '@vueuse/core'
import { useEncryption } from '@shared/composables/useEncryption'
import sodium from 'libsodium-wrappers'

const PUBLIC_KEY_HEADER = import.meta.env.VITE_PUBLIC_KEY_HEADER
const ENCRYPTED_HEADER = import.meta.env.VITE_ENCRYPTED_HEADER

async function decryptResponse({
  ctx,
  keyPair
}: {
  ctx: AfterFetchContext
  keyPair: sodium.KeyPair | undefined
}) {
  const { decrypt } = useEncryption()
  const isEncrypted = ctx.response.headers.get(ENCRYPTED_HEADER) === 'true'

  if (!keyPair || !isEncrypted) {
    return undefined // not encrypted
  }

  if (typeof ctx.data !== 'string' && !(ctx.data instanceof Uint8Array)) {
    return undefined // unexpected type
  }

  const decryptedData = await decrypt(ctx.data, keyPair)

  if (!(decryptedData instanceof Uint8Array)) {
    return undefined // decryption failed
  }

  if (ctx.response.headers.get('Content-Type') === 'application/json') {
    const json = new TextDecoder().decode(decryptedData)
    return JSON.parse(json)
  }
  return decryptedData
}

export const useFetchWithCredentials = <T>(
  url: MaybeRefOrGetter<string>,
  fetchOptions?: RequestInit,
  useFetchOptions?: UseFetchOptions
) => {
  const { generateKeyPair, getPublicKey } = useEncryption()
  const defaultOptions: Record<string, RequestCredentials> = { credentials: 'include' }
  const defaultUseFetchOptions: UseFetchOptions = { immediate: true, updateDataOnError: true }

  let keyPair: sodium.KeyPair | undefined

  // Reference: https://vueuse.org/core/useFetch/#intercepting-a-request
  async function beforeFetch({ options }: BeforeFetchContext) {
    keyPair = await generateKeyPair()
    const publicKey = await getPublicKey(keyPair)

    options.headers = {
      ...options.headers,
      ...{ [`${PUBLIC_KEY_HEADER}`]: publicKey }
    }

    return {
      options
    }
  }

  async function afterFetch(ctx: AfterFetchContext) {
    const data = await decryptResponse({ ctx, keyPair })
    if (data) ctx.data = data
    return ctx
  }

  async function onFetchError(ctx: any) {
    const error = await decryptResponse({ ctx, keyPair })
    if (error) {
      ctx.data = undefined
      ctx.error = error
    }
    return ctx
  }

  const fetchConfig = { ...defaultOptions, ...fetchOptions }
  const useFetchConfig = {
    ...defaultUseFetchOptions,
    ...useFetchOptions,
    beforeFetch,
    afterFetch,
    onFetchError
  }

  return useFetch<T>(url, fetchConfig, useFetchConfig)
}
