import type { Link } from '@shared/types/link'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { t } from '@shared/i18n'

import { useAuthStore } from '@portal/store/useAuthStore'
import { useActionsStore } from '@portal/store/useActionsStore'

import AuthenticationButton from '@portal/components/AuthenticationButton/AuthenticationButton.vue'

import { MY_REQUESTS_OVERVIEW, MY_MESSAGES_OVERVIEW } from '@portal/router/names'

export const useAppHeaderLinks = () => {
  const actionsStore = useActionsStore()
  const authStore = useAuthStore()
  const { applicationCount, messageCount } = storeToRefs(actionsStore)
  const { isLoggedIn } = storeToRefs(authStore)

  const leftLinks: Link[] = []

  const rightLinks = computed<Link[]>(() => {
    return isLoggedIn.value
      ? [
          {
            name: MY_REQUESTS_OVERVIEW,
            label: t('pages.my-requests-overview.title'),
            ...(applicationCount.value && { badge: applicationCount.value })
          },
          {
            name: MY_MESSAGES_OVERVIEW,
            label: t('pages.my-messages-overview.title'),
            ...(messageCount.value && { badge: messageCount.value })
          }
        ]
      : []
  })

  return {
    leftLinks,
    rightLinks,
    AuthComponent: AuthenticationButton,
    UserComponent: null
  }
}
