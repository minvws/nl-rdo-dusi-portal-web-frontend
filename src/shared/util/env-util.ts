const Project = {
  PORTAL: 'portal',
  ASSESSMENT: 'assessment'
} as const

export function isPortal() {
  return import.meta.env.VITE_PROJECT === Project.PORTAL
}

export function isAssessment() {
  return import.meta.env.VITE_PROJECT === Project.ASSESSMENT
}
