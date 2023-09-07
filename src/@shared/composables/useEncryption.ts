import type { Ref } from 'vue'
import { ref } from 'vue'

import { log } from '@shared/utils/logger'

export const useEncryption = () => {
  const keyPair: Ref<CryptoKeyPair | undefined> = ref(undefined)

  /**
   * Decrypts data with a private key
   * @param {CryptoKey} privateKey
   * @param {ArrayBuffer} data
   * @returns {*} decrypted data
   */
  async function decrypt(
    privateKey: CryptoKey,
    data: ArrayBuffer
  ): Promise<ArrayBuffer | undefined> {
    const options = { name: 'RSA-OAEP' }

    try {
      const decryptedData = await crypto.subtle.decrypt(options, privateKey, data)

      return decryptedData
    } catch (error) {
      log('Decryption error:', error)
    }
  }

  /**
   * Encrypts data with a public key
   * @param {CryptoKey} publicKey
   * @param {string} data
   * @returns encrypted data
   */
  async function encrypt(publicKey: CryptoKey, data: string): Promise<ArrayBuffer | undefined> {
    const options = { name: 'RSA-OAEP' }
    const dataBuffer = new TextEncoder().encode(data)

    try {
      const encryptedData = await crypto.subtle.encrypt(options, publicKey, dataBuffer)
      return encryptedData
    } catch (error) {
      log('Encryption error:', error)
    }
  }

  /**
   * Generates a key pair
   * @returns {CryptoKeyPair} key pair
   */
  async function generateKeyPair(): Promise<CryptoKeyPair | undefined> {
    const options: RsaHashedKeyGenParams = {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    }
    const isExtractable = true
    const keyUsages: KeyUsage[] = ['encrypt', 'decrypt']

    try {
      const result = await crypto.subtle.generateKey(options, isExtractable, keyUsages)
      keyPair.value = result
      return result
    } catch (error) {
      log('Key pair generation error:', error)
    }
  }

  /**
   * Return the exported public key as a JWK.
   * @returns {Promise<JsonWebKey>} public key
   */
  async function getPublicKey(): Promise<JsonWebKey | undefined> {
    const publicKey = keyPair.value?.publicKey

    if (!publicKey) {
      log('No public key found')
      return
    }

    try {
      const result = await crypto.subtle.exportKey('jwk', publicKey)
      return result
    } catch (error) {
      log('Public key error:', error)
    }
  }

  return {
    decrypt,
    encrypt,
    keyPair,
    generateKeyPair,
    getPublicKey
  }
}
