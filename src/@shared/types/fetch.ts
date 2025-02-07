export const CustomFetchType = {
  CREDENTIALS: 'with-credentials',
  ENCRYPTION: 'with-encryption'
} as const

export type CustomFetch = (typeof CustomFetchType)[keyof typeof CustomFetchType]
