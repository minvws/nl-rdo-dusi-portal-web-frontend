const Project = {
  PORTAL: 'portal',
  REVIEW: 'review'
} as const

export const portalProject = import.meta.env.VITE_PROJECT === Project.PORTAL
export const reviewProject = import.meta.env.VITE_PROJECT === Project.REVIEW
