import { RequestStatus } from '@shared/types/request'

type Status = (typeof RequestStatus)[keyof typeof RequestStatus]

type CaseTransition = {
  application: {
    status: Status
    subsidyStage: {
      title: string
      stage: number
    }
  }
}

export type CaseTransitionPreview = {
  current: CaseTransition
  target: CaseTransition
  message?: {
    html: string
  }
}
