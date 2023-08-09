const project = {
  PORTAL: 'portal',
  REVIEW: 'review'
}

export const portalProject = import.meta.env.VITE_PROJECT === project.PORTAL
export const reviewProject = import.meta.env.VITE_PROJECT === project.REVIEW
