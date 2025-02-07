export const SessionType = {
  EXPIRED: 'expired',
  EXPIRING: 'expiring',
  INVALID: 'invalid',
  VALID: 'valid'
} as const

export type Session = (typeof SessionType)[keyof typeof SessionType]
