export const StageType = {
  ASSESSMENT: 'Beoordeling',
  REQUEST: 'Aanvraag'
} as const

export type Stage = (typeof StageType)[keyof typeof StageType]
