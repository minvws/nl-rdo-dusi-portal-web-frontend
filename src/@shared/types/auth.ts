export const AuthError = {
  LOGIN_CANCELLED: 'login_cancelled',
  LOGIN_FAILED: 'login_failed',
  MINIMUM_LOA: 'minimum_loa',
  UNKNOWN: 'unknown'
} as const

export const MinimumLoa = {
  BASIC: 'basic',
  LOW: 'low',
  SUBSTANTIAL: 'substantial',
  HIGH: 'high'
} as const

export const AuthMinimumLoaQuery = {
  MINIMUM_LOA: 'minimum_loa',
  CURRENT_LOA: 'current_loa'
}

export type AuthErrorType = (typeof AuthError)[keyof typeof AuthError]

export type MinimumLoaType = (typeof MinimumLoa)[keyof typeof MinimumLoa]
