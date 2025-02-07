export const ReviewerActionType = {
  ASSIGN: 'assign',
  CLAIM: 'claim',
  RELEASE: 'release',
  SHOW: 'show'
} as const

export type ReviewerAction = (typeof ReviewerActionType)[keyof typeof ReviewerActionType]
