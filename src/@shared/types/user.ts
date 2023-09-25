export const UserRoleType = {
  REVIEWER: 'reviewer',
  COORDINATOR: 'coordinator',
  ADMIN :'admin',
} as const

export type UserRole = (typeof UserRoleType)[keyof typeof UserRoleType]

export type UserRoleWeight = {
  [UserRoleType.REVIEWER]: 1,
  [UserRoleType.COORDINATOR]: 2,
  [UserRoleType.ADMIN]: 3,
}

export type User = {
  name?: string,
  role: UserRole,
  rights: UserRoleWeight[UserRole],
  twoFactor: boolean,
}
