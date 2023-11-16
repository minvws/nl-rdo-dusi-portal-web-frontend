export const ReviewerAction = {
  ASSIGN: 'assign',
  CLAIM: 'claim',
  SHOW: 'show',
  RELEASE: 'release'
} as const

export type ReviewerActionType = (typeof ReviewerAction)[keyof typeof ReviewerAction]
