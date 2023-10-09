export type CaseHistory = {
  id: string
  subsidyStage: {
    id: string
    title: string
    stage: number
  }
  assessorUser: { id: string; name: string } | null
  createdAt: string
  updatedAt: string
  submittedAt: string
  internalNote?: string
}
