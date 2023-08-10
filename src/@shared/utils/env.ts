const Project = {
  PORTAL: 'portal',
  ASSESSMENT: 'assessment'
} as const

export const portalProject = import.meta.env.VITE_PROJECT === Project.PORTAL
export const assessmentProject = import.meta.env.VITE_PROJECT === Project.ASSESSMENT
