import type { UserRoleRoutes } from '@shared/types/user'
import { UserRoleNameType } from '@shared/types/user'
import {
  ALL_CASES_OVERVIEW,
  CHECK_DETAILS,
  CHECKS_OVERVIEW,
  FORGOT_PASSWORD,
  IBAN_CHECK,
  LOGIN_VIEW,
  LOGIN,
  MY_CASE_DETAILS_HISTORY,
  MY_CASE_DETAILS_REVIEWER,
  MY_CASE_DETAILS,
  MY_CASES_OVERVIEW,
  PASSWORD_UPDATE_VIEW,
  PASSWORD_RESET_VIEW,
  PREVIEW_CASE_SUBMIT,
  PROFILE_VIEW,
  REFRESH,
  REPORT_DETAILS,
  REPORTS_OVERVIEW,
  REVIEW_CASE,
  TWO_FACTOR_VIEW
} from '@assessment/router/names'

const SHARED_ROUTES = [
  FORGOT_PASSWORD,
  LOGIN_VIEW,
  LOGIN,
  PASSWORD_UPDATE_VIEW,
  PASSWORD_RESET_VIEW,
  PROFILE_VIEW,
  REFRESH,
  TWO_FACTOR_VIEW
]

const CASES_ROUTES = [
  ALL_CASES_OVERVIEW,
  MY_CASE_DETAILS_HISTORY,
  MY_CASE_DETAILS_REVIEWER,
  MY_CASE_DETAILS,
  MY_CASES_OVERVIEW,
  PREVIEW_CASE_SUBMIT,
  REVIEW_CASE
]

const CHECKS_ROUTES = [CHECK_DETAILS, CHECKS_OVERVIEW, IBAN_CHECK]

const REPORTS_ROUTES = [REPORT_DETAILS, REPORTS_OVERVIEW]

const roleRoutes: UserRoleRoutes = {
  [UserRoleNameType.ASSESSOR]: [...SHARED_ROUTES, ...CASES_ROUTES],
  [UserRoleNameType.DATA_EXPORTER]: [...SHARED_ROUTES, ...REPORTS_ROUTES],
  [UserRoleNameType.IMPLEMENTATION_COORDINATOR]: [...SHARED_ROUTES, ...CASES_ROUTES, ...REPORTS_ROUTES],
  [UserRoleNameType.INTERNAL_AUDITOR]: [...SHARED_ROUTES, ...CASES_ROUTES, ...CHECKS_ROUTES],
  [UserRoleNameType.LEGALS_PECIALIST]: [...SHARED_ROUTES, ...CASES_ROUTES],
  [UserRoleNameType.USER_ADMIN]: []
}

export default roleRoutes
