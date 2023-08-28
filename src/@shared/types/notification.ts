export type Notification = {
  message: string | { message?: string }
  displayAs: 'error' | 'warning' | 'explanation' | 'success'
  label?: string
}
