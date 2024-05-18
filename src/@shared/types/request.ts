export const RequestStatus = {
  ALLOCATED: 'allocated',
  APPROVED: 'approved',
  DRAFT: 'draft',
  PENDING: 'pending',
  RECLAIMED: 'reclaimed',
  REJECTED: 'rejected',
  REQUEST_CHANGES: 'requestForChanges'
} as const

export type RequestData = Record<string, Record<string, any>>[]

export type RawRequestData = {
  items: Record<string, any>[]
}
