const Project = {
  PORTAL: 'portal',
  REVIEW: 'assessment'
} as const

export const isPortalProject = import.meta.env.VITE_PROJECT === Project.PORTAL
export const isReviewProject = import.meta.env.VITE_PROJECT === Project.REVIEW
