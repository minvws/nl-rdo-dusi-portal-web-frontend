/**
 * User role types
 *
 * Order:
 * 1. Gebruikersbeheerder
 * 2. Uitvoeringscoordinator
 * 3. Beoordelaar
 * 4. Interne Controleur
 */

export const UserRoles = {
  USER_ADMIN: 'userAdmin',
  IMPLEMENTATION_COORDINATOR: 'implementationCoordinator',
  ASSESSOR: 'assessor',
  INTERNAL_AUDITOR: 'internalAuditor'
} as const

export type UserRoleType = (typeof UserRoles)[keyof typeof UserRoles]

export type UserRole = {
  name: UserRoleType
  subsidyId: string
  viewAllStages: boolean
}

export type User = {
  email: string
  name: string
  organisation: {
    name: string
  }
  roles: UserRole[]
}
