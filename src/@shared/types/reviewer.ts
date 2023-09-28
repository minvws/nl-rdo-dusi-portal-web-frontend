export const ReviewerAction = {
  SHOW: 'show',
  CLAIM: 'claim',
  RELEASE: 'release'
} as const

export type ReviewerActionType = (typeof ReviewerAction)[keyof typeof ReviewerAction]
