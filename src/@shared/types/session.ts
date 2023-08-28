export const SessionType = {
  VALID: 'valid',
  EXPIRING: 'expiring',
  EXPIRED: 'expired',
  INVALID: 'invalid'
} as const

export type Session = (typeof SessionType)[keyof typeof SessionType]
