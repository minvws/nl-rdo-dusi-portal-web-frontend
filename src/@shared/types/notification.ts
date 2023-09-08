export type Notification = {
  message: string | { message?: string }
  displayAs: 'error' | 'warning' | 'explanation' | 'confirmation'
  label?: string
}
