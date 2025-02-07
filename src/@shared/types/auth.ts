export const AuthErrorType = {
  LOGIN_CANCELLED: 'login_cancelled',
  LOGIN_FAILED: 'login_failed',
  MINIMUM_LOA: 'minimum_loa',
  UNKNOWN: 'unknown'
} as const

export type AuthError = (typeof AuthErrorType)[keyof typeof AuthErrorType]

export const AuthLoaQueryType = {
  MINIMUM_LOA: 'minimum_loa',
  CURRENT_LOA: 'current_loa'
} as const

export type AuthLoaQuery = (typeof AuthLoaQueryType)[keyof typeof AuthLoaQueryType]
