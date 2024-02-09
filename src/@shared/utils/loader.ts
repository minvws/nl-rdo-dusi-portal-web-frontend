import { ProjectType } from '@shared/types/project'

export function routerLoader(): Promise<any> {
  switch (import.meta.env.VITE_PROJECT) {
    case ProjectType.ASSESSMENT: {
      return import('@assessment/router')
    }
    case ProjectType.PORTAL: {
      return import('@portal/router')
    }
    default: {
      throw new Error(`unknown project: "${import.meta.env.VITE_PROJECT}"`)
    }
  }
}

export function appHeaderLinksLoader(): Promise<any> {
  switch (import.meta.env.VITE_PROJECT) {
    case ProjectType.ASSESSMENT: {
      return import('@assessment/composables/useAppHeaderLinks')
    }
    case ProjectType.PORTAL: {
      return import('@portal/composables/useAppHeaderLinks')
    }
    default: {
      throw new Error(`unknown project: "${import.meta.env.VITE_PROJECT}"`)
    }
  }
}
