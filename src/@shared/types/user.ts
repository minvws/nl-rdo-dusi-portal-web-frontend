/**
 * User role types
 *
 * Order:
 * 1. Beoordelaar
 * 2. Data exporteur
 * 3. Uitvoeringscoordinator
 * 4. Interne Controleur
 * 5. Juridisch specialist
 */

export const UserRoles = {
  ASSESSOR: 'assessor',
  DATA_EXPORTER: 'dataExporter',
  IMPLEMENTATION_COORDINATOR: 'implementationCoordinator',
  INTERNAL_AUDITOR: 'internalAuditor',
  LEGALS_PECIALIST: 'legalSpecialist'
} as const

export type UserRoleType = (typeof UserRoles)[keyof typeof UserRoles]

export type UserRole = {
  name: UserRoleType
  subsidy: {
    id: string,
    title: string
  }
  viewAllStages: boolean
}

export type User = {
  email: string
  name: string
  organisation: {
    name: string
  }
  roles: UserRole[]
  passwordExpired: boolean
}
