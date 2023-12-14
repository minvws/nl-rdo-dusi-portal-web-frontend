import type { ComputedRef } from 'vue'
import type { Link } from '@shared/types/link'
import { UserRoles } from '@shared/types/user'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { translate } from '@shared/i18n'

import { useAuthStore } from '@assessment/store/useAuthStore'

import AuthenticationButton from '@assessment/components/AuthenticationButton/AuthenticationButton.vue'

import {
  ALL_CASES_OVERVIEW,
  CHECKS_OVERVIEW,
  MY_CASES_OVERVIEW,
  REPORTS_OVERVIEW
} from '@assessment/router/names'

const DEFAULT_ROUTES: Link[] = [
  {
    name: MY_CASES_OVERVIEW,
    label: translate('app.name'),
    icon: 'home'
  },
  {
    name: ALL_CASES_OVERVIEW,
    label: translate('pages.all-cases-overview.title')
  }
]

const AUDITOR_ROUTES: Link[] = [
  {
    name: CHECKS_OVERVIEW,
    label: translate('pages.checks-overview.title')
  }
]

const DATA_EXPORTER_ROUTES: Link[] = [
  {
    name: REPORTS_OVERVIEW,
    label: translate('pages.reports-overview.title')
  }
]

export const useAppHeaderLinks = () => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)
  const leftLinks: Link[] = []

  const isUserAdmin: ComputedRef<boolean> = computed(() =>
    authStore.checkUserRights([UserRoles.USER_ADMIN])
  )

  const isImplementationCoordinator: ComputedRef<boolean> = computed(() =>
    authStore.checkUserRights([UserRoles.IMPLEMENTATION_COORDINATOR])
  )

  const isAssessor: ComputedRef<boolean> = computed(() =>
    authStore.checkUserRights([UserRoles.ASSESSOR])
  )

  const isInternalAuditor: ComputedRef<boolean> = computed(() =>
    authStore.checkUserRights([UserRoles.INTERNAL_AUDITOR])
  )

  const isDataExporter: ComputedRef<boolean> = computed(() =>
    authStore.checkUserRights([UserRoles.DATA_EXPORTER])
  )

  const rightLinks: ComputedRef<Link[]> = computed(() => {
    const routes: Link[] = []

    if (!isLoggedIn.value || isUserAdmin.value) {
      return routes
    }

    if (isImplementationCoordinator.value || isAssessor.value) {
      routes.push(...DEFAULT_ROUTES)
    }

    if (isInternalAuditor.value) {
      routes.push(...DEFAULT_ROUTES)
      routes.push(...AUDITOR_ROUTES)
    }

    if (isDataExporter.value) {
      routes.push(...DATA_EXPORTER_ROUTES)
    }

    return routes
  })

  return {
    leftLinks,
    rightLinks,
    AuthComponent: AuthenticationButton
  }
}
