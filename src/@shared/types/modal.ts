import type { Component, Raw } from 'vue'

export enum ModalType {
  DEFAULT = 'notification',
  ERROR = 'error',
  WARNING = 'warning',
  EXPLANATION = 'explanation',
  SUCCESS = 'confirmation'
}

export type Modal = {
  type: ModalType
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
