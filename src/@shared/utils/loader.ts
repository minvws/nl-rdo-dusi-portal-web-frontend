import { Project } from '@shared/types/project'

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
