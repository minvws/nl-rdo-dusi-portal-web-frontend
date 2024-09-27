import type { Link } from '@shared/types/link'
import type { UserRole, UserRoleName } from '@shared/types/user'

import { UserRoleNameType } from '@shared/types/user'

import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@assessment/store/useAuthStore'

import AuthenticationButton from '@assessment/components/AuthenticationButton/AuthenticationButton.vue'
import ProfileButton from '@assessment/components/ProfileButton/ProfileButton.vue'

import { t } from '@shared/i18n'
import { log } from '@shared/utils/logger'

import {
  ALL_CASES_OVERVIEW,
  CHECKS_OVERVIEW,
  MY_CASES_OVERVIEW,
  REPORTS_OVERVIEW
} from '@assessment/router/names'
import { implementationCoordinatorHasAllowedExports } from '@assessment/composables/useDataExport'

const DEFAULT_ROUTES: Link[] = [
  {
    name: MY_CASES_OVERVIEW,
    label: t('app.name'),
    icon: 'home'
  },
  {
    name: ALL_CASES_OVERVIEW,
    label: t('pages.all-cases-overview.title')
  }
]

const AUDITOR_ROUTES: Link[] = [
  {
    name: CHECKS_OVERVIEW,
    label: t('pages.checks-overview.title')
  }
]

const DATA_EXPORTER_ROUTES: Link[] = [
  {
    name: REPORTS_OVERVIEW,
    label: t('pages.reports-overview.title')
  }
]

export const useAppHeaderLinks = () => {
  const authStore = useAuthStore()

  const { isLoggedIn, user } = storeToRefs(authStore)

  const leftLinks = ref<Link[]>([])

  const rightLinks = computed<Link[]>(() => {
    const routes = matchRoutesByRole()
    return [...new Set(routes)]
  })

  function matchRoutesByRole(): Link[] {
    const routes: Link[] = []

    if (!isLoggedIn.value || !user.value) {
      return routes
    }

    for (const role of user.value.roles) {
      const name: UserRoleName = role.name

      switch (name) {
        case UserRoleNameType.ASSESSOR:
        case UserRoleNameType.LEGALS_PECIALIST: {
          routes.push(...DEFAULT_ROUTES)
          break
        }
        case UserRoleNameType.IMPLEMENTATION_COORDINATOR: {
          routes.push(...DEFAULT_ROUTES)
          if (implementationCoordinatorHasAllowedExports(role)) {
            routes.push(...DATA_EXPORTER_ROUTES)
          }
          break
        }
        case UserRoleNameType.INTERNAL_AUDITOR: {
          routes.push(...DEFAULT_ROUTES)
          routes.push(...AUDITOR_ROUTES)
          break
        }
        case UserRoleNameType.DATA_EXPORTER: {
          routes.push(...DATA_EXPORTER_ROUTES)
          break
        }
        default: {
          log(`Unknown role: ${name}`)
        }
      }
    }

    return routes
  }

  return {
    leftLinks,
    rightLinks,
    AuthComponent: AuthenticationButton,
    UserComponent: ProfileButton
  }
}
