export const RequestStatus = {
  ALLOCATED: 'allocated',
  APPROVED: 'approved',
  DRAFT: 'draft',
  PENDING: 'pending',
  RECLAIMED: 'reclaimed',
  REJECTED: 'rejected',
  REQUEST_CHANGES: 'requestForChanges'
} as const

/**
 * TODO: Set correct type for RequestItem
 * See createSet function in transform.ts
 */
export type RequestItem = Record<string, object>

export type RequestData = RequestItem[]

export type RawRequestData = {
  items: RawRequestItem[]
}

export type RawRequestItem = {
  expiresAt: string | null
  finalReviewDeadline: string | null
  isEditable: boolean
  reference: string
  status: string
  submittedAt: string | null
  subsidy: {
    allowMultipleApplications: boolean
    code: string
    description: string
    isOpenForNewApplications: boolean
    pageUrl: string
    title: string
    validFrom: string
    validTo: string | null
  }
  updatedAt: string
}
