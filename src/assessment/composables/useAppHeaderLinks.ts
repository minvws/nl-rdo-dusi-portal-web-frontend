import type { Ref } from 'vue'
import type { Link } from '@shared/types/link'

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

const DEFAULT_ROUTES = [
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

const AUDITOR_ROUTES = [
  {
    name: CHECKS_OVERVIEW,
    label: translate('pages.checks-overview.title')
  }
]
const DATA_EXPORTER_ROUTES = [
  {
    name: REPORTS_OVERVIEW,
    label: translate('pages.reports-overview.title')
  }
]

export const useAppHeaderLinks = () => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)
  const leftLinks: Link[] = []

  const isInternalAuditor = computed(() => authStore.checkUserRights(['internalAuditor']))

  const isDataExporter = computed(() => authStore.checkUserRights(['dataExporter']))

  const rightLinks: Ref<Link[]> = computed(() => {
    if (!isLoggedIn.value) {
      return []
    }

    if (isInternalAuditor.value) {
      return [...DEFAULT_ROUTES, ...AUDITOR_ROUTES]
    }

    if (isDataExporter.value) {
      return [...DEFAULT_ROUTES, ...DATA_EXPORTER_ROUTES]
    }

    return DEFAULT_ROUTES
  })

  return {
    leftLinks,
    rightLinks,
    AuthComponent: AuthenticationButton
  }
}
