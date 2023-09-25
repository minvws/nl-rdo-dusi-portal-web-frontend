import type { Ref } from 'vue'
import type { Link } from '@shared/types/link'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { translate } from '@shared/i18n'

import { useAuthStore } from '@portal/store/useAuthStore'

import AuthenticationButton from '@assessment/components/AuthenticationButton/AuthenticationButton.vue'

import { MY_CASES_OVERVIEW, ALL_CASES_OVERVIEW } from '@assessment/router/names'

export const useAppHeaderLinks = () => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  const leftLinks: Link[] = []

  const rightLinks: Ref<Link[]> = computed(() => {
    const asdf = import.meta.env.VITE_MOCK_DATA === 'true'
    if (!asdf) return []
    return [
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
  })

  return {
    leftLinks,
    rightLinks,
    AuthComponent: AuthenticationButton
  }
}
