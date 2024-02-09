export const NotificationType = {
  CONFIRMATION: 'confirmation',
  ERROR: 'error',
  EXPLANATION: 'explanation',
  WARNING: 'warning'
} as const

export type NotificationDisplayType = (typeof NotificationType)[keyof typeof NotificationType]

export type Notification = {
  message: string | { message?: string }
  displayAs: NotificationDisplayType
  label?: string
}
