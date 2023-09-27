export const NotificationType = {
  ERROR: 'error',
  WARNING: 'warning',
  EXPLANATION: 'explanation',
  CONFIRMATION: 'confirmation'
} as const

export type NotificationDisplayType = (typeof NotificationType)[keyof typeof NotificationType]

export type Notification = {
  message: string | { message?: string }
  displayAs: NotificationDisplayType
  label?: string
}
