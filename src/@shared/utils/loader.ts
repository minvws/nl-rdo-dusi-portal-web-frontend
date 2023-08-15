import type { FormOptions } from '../types/form-options'
import { Project } from '../types/project'

export const routerLoader = () => {
  switch (import.meta.env.VITE_PROJECT) {
    case Project.ASSESSMENT:
      return import('@assessment/router')
    case Project.PORTAL:
      return import('@portal/router')
    default:
      throw new Error(`unknown project: "${import.meta.env.VITE_PROJECT}"`)
  }
}

export const appHeaderLinksLoader = () => {
  switch (import.meta.env.VITE_PROJECT) {
    case Project.ASSESSMENT:
      return import('@assessment/composables/useAppHeaderLinks')
    case Project.PORTAL:
      return import('@portal/composables/useAppHeaderLinks')
    default:
      throw new Error(`unknown project: "${import.meta.env.VITE_PROJECT}"`)
  }
}

export const filterOptionsLoader = (type: FormOptions) => {
  switch (import.meta.env.VITE_PROJECT) {
    case Project.ASSESSMENT:
      switch (type) {
        case 'requests':
          return import('@assessment/filter-options/requests')
        case 'all-requests':
          return import('@assessment/filter-options/all-requests')
      }
      break
    case Project.PORTAL:
      switch (type) {
        case 'messages':
          return import('@portal/filter-options/messages')
      }
      break
    default:
      throw new Error(`unknown project: "${import.meta.env.VITE_PROJECT}"`)
  }
}
