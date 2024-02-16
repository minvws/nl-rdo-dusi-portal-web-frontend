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

export const UserRoleNameType = {
  ASSESSOR: 'assessor',
  DATA_EXPORTER: 'dataExporter',
  IMPLEMENTATION_COORDINATOR: 'implementationCoordinator',
  INTERNAL_AUDITOR: 'internalAuditor',
  LEGALS_PECIALIST: 'legalSpecialist',
  USER_ADMIN: 'userAdmin'
} as const

export type UserRoleName = (typeof UserRoleNameType)[keyof typeof UserRoleNameType]

export type UserRole = {
  name: UserRoleName
  subsidy: {
    id: string
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

export type UserRoleRoutes = Record<string, string[]>
