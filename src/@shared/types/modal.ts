import type { Component, Raw } from 'vue'

export const ModalType = {
  DEFAULT: 'notification',
  ERROR: 'error',
  WARNING: 'warning',
  EXPLANATION: 'explanation',
  SUCCESS: 'confirmation'
} as const

export type Modal = {
  type: (typeof ModalType)[keyof typeof ModalType]
  title: string | undefined
  message: string | undefined
  component?: {
    name: Raw<Component>
    props: Record<string, unknown>
  }
  buttons?: {
    label: string | undefined
    action: () => void
  }[]
}
