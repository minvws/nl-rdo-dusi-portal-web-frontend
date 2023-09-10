import type { Ref } from 'vue'
import { ref } from 'vue'

import { log } from '@shared/utils/logger'

interface EncryptedResponse {
  status: number
  key: string
  initializationVector: string
  data: string
}

function isEncryptedResponse(object: any): object is EncryptedResponse {
  return (
    'status' in object && 'key' in object && 'initializationVector' in object && 'data' in object
  )
}


export const useEncryption = () => {
  /**
   * Decrypts data with a private key
   * @param {CryptoKey} privateKey
   * @param {any} data
   * @returns {*} decrypted data
   */
  async function decrypt(
    privateKey: CryptoKey,
    data: any
  ): Promise<ArrayBuffer | undefined> {
    if (!isEncryptedResponse(data)) {
      return data
    }

    try {
      const keyAlgo: RsaOaepParams = { name: 'RSA-OAEP' }
      const encryptedKey = new TextEncoder().encode(btoa(data.key))
      log('A', atob(new TextDecoder().decode(encryptedKey)))
      const decryptedKey = await crypto.subtle.decrypt(keyAlgo, privateKey, encryptedKey)
      log('B', decryptedKey)
      const dataAlgo = { name: 'AES-CTR' }
      const dataKey = await crypto.subtle.importKey('pkcs8', decryptedKey, dataAlgo, false, []);
      log('D')
      const encryptedData = new TextEncoder().encode(btoa(data.data))
      log('E')
      const decryptedData = await crypto.subtle.decrypt(dataAlgo, dataKey, encryptedData)
      log('F')
      return JSON.parse(new TextDecoder().decode(decryptedData))
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
      return await crypto.subtle.generateKey(options, isExtractable, keyUsages)
    } catch (error) {
      log('Key pair generation error:', error)
    }
  }

  /**
   * Return the exported public key as a JWK.
   * @returns {Promise<JsonWebKey>} public key
   */
  async function getPublicKey(keyPair: CryptoKeyPair): Promise<ArrayBuffer | undefined> {
    const publicKey = keyPair.publicKey

    if (!publicKey) {
      log('No public key found')
      return
    }

    try {
      const result = await crypto.subtle.exportKey('spki', publicKey)
      return result
    } catch (error) {
      log('Public key error:', error)
    }
  }

  return {
    decrypt,
    encrypt,
    generateKeyPair,
    getPublicKey
  }
}
