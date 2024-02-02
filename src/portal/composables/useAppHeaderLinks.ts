import type { Link } from '@shared/types/link'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { t } from '@shared/i18n'

import { useAuthStore } from '@portal/store/useAuthStore'
import { useFetchActionsCount } from '@portal/composables/useFetchActionsCount'

import AuthenticationButton from '@portal/components/AuthenticationButton/AuthenticationButton.vue'

import { MY_REQUESTS_OVERVIEW, MY_MESSAGES_OVERVIEW } from '@portal/router/names'

export const useAppHeaderLinks = () => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)
  const { data: actions } = useFetchActionsCount()

  const leftLinks: Link[] = []

  const rightLinks = computed<Link[]>(() => {
    const { applicationCount, messageCount } = actions.value
    if (!isLoggedIn.value) return []
    return [
      {
        name: MY_REQUESTS_OVERVIEW,
        label: t('pages.my-requests-overview.title'),
        ...(applicationCount && { badge: applicationCount })
      },
      {
        name: MY_MESSAGES_OVERVIEW,
        label: t('pages.my-messages-overview.title'),
        ...(messageCount && { badge: messageCount })
      }
    ]
  })

  return {
    leftLinks,
    rightLinks,
    AuthComponent: AuthenticationButton
  }
}
