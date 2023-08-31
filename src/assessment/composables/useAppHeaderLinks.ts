import type { Ref } from 'vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { translate } from '@shared/i18n'

import { useAuthStore } from '@portal/store/useAuthStore'

import AuthenticationButton from '@assessment/components/AuthenticationButton/AuthenticationButton.vue'

import { HOME, MY_CASES_OVERVIEW } from '@shared/router/names'
import type { Link } from '@shared/types/link'

export const useAppHeaderLinks = () => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  const leftLinks: Link[] = []

  const rightLinks: Ref<Link[]> = computed(() => {
    if (!isLoggedIn.value) return []
    return [
      {
        name: HOME,
        label: translate('app.name'),
        icon: 'home'
      },
      {
        name: MY_CASES_OVERVIEW,
        label: translate('pages.my-cases-overview.title')
      }
    ]
  })

  return {
    leftLinks,
    rightLinks,
    AuthComponent: AuthenticationButton
  }
}
