export const ProjectType = {
  ASSESSMENT: 'assessment',
  PORTAL: 'portal'
} as const

export type Project = (typeof ProjectType)[keyof typeof ProjectType]
