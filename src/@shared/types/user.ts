/**
 * User role types
 *
 * Order:
 * 1. Gebruikersbeheerder
 * 2. Uitvoeringscoordinator
 * 3. Beoordelaar
 * 4. Interne Controleur
 */
export const UserRoleType = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  REVIEWER: 'reviewer',
  FORM_REVIEWER: 'form_reviewer'
} as const

export type UserRole = (typeof UserRoleType)[keyof typeof UserRoleType]

export type UserRoleWeight = {
  [UserRoleType.SUPER_ADMIN]: 4
  [UserRoleType.ADMIN]: 3
  [UserRoleType.REVIEWER]: 2
  [UserRoleType.FORM_REVIEWER]: 1
}

export type User = {
  name?: string
  role: UserRole
  rights: UserRoleWeight[UserRole]
  twoFactor: boolean
}
