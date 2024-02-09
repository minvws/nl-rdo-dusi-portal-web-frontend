type RawCaseHistoryItem = {
  id: string
  subsidyStage: {
    id: string
    title: string
    stage: number
  }
  assessorUser: { id: string; name: string } | undefined
  createdAt: string
  updatedAt: string
  submittedAt: string
  internalNote?: string
}

export type RawCaseHistory = RawCaseHistoryItem[]

export type CaseHistoryItem = {
  updated_at: {
    type: string
    text: string
  }
  action: {
    type: string
    text: string
  }
  assessor: {
    type: string
    text: string
  }
  internalNote: {
    type: string
    text: string
  }
}

export type CaseHistory = CaseHistoryItem[]
