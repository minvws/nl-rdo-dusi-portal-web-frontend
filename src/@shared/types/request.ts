export const RequestStatus = {
  APPROVED: 'approved',
  DRAFT: 'draft',
  IN_PROGRESS: 'in_progress',
  REJECTED: 'rejected',
  REQUEST_CHANGES: 'requestForChanges',
  SUBMITTED: 'submitted'
} as const

export type RequestData = Record<string, Record<string, any>>[]

export type RawRequestData = {
  items: Record<string, any>[]
}
