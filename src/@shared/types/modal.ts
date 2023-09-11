export const ModalType = {
  ERROR: 'error',
  WARNING: 'warning',
  EXPLANATION: 'explanation',
  SUCCESS: 'confirmation'
} as const

export type Modal = {
  type: (typeof ModalType)[keyof typeof ModalType]
  title: string
  message: string
  buttons?: {
    label: string
    action: () => void
  }[]
}
