export const NotificationType = {
  CONFIRMATION: 'confirmation',
  ERROR: 'error',
  EXPLANATION: 'explanation',
  WARNING: 'warning'
} as const

export type NotificationDisplayType = (typeof NotificationType)[keyof typeof NotificationType]

export const NotificationDisplayElement = {
  P: 'p',
  DIV: 'div',
} as const

export type NotificationDisplayElementType = (typeof NotificationDisplayElement)[keyof typeof NotificationDisplayElement]

export type Notification = {
  message: string | { message?: string }
  displayAs: NotificationDisplayType
  label?: string
  dismissable?: boolean
}
