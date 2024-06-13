import type { RawRequestItem, RequestData } from '@shared/types/request'

export type SubsidyOverviewData = {
  subsidy: Record<string, any>
  newConceptAllowed: boolean
  hasApprovedApplication: boolean
  hasRejectedApplication: boolean
  applications: RequestData
}

export type RawSubsidyOverviewData = {
  subsidy: Record<string, any>
  newConceptAllowed: boolean
  hasApprovedApplication: boolean
  hasRejectedApplication: boolean
  applications: RawRequestItem[]
}
