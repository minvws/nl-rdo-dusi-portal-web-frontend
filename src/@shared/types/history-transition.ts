import type { JsonSchema, UISchemaElement } from '@jsonforms/core'

type Assessor = {
  id: string
  name: string
}

export type Stage = {
  id: string
  title: string
  stage: number
}

export type History = {
  title: string
  forms: { dataschema: JsonSchema; uischema: UISchemaElement }[]
  noButtons: boolean
}

export type HistoryTransitionStage = {
  subsidyStage: Stage
  assessorUser: Assessor
}

export type HistoryTransition = {
  id: string
  previousApplicationStage: HistoryTransitionStage
  newApplicationStage: HistoryTransitionStage
  subsidyStageTransition: {
    id: string
    description: string
  }
  message?: {
    id: string
    subject: string
  }
  internalNote: string
  createdAt: string
}

export type HistoryTransitionItem = {
  date: string
  formattedDate: string
  subject: string
  internalNote: string
  description: string
  message?: {
    id: string
    subject: string
  }
  items: {
    title: string
    assessor?: string
    stage: number
  }[]
}
