import type { Ref } from 'vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { translate } from '@shared/i18n'

import { useAuthStore } from '@portal/store/useAuthStore'

import AuthenticationButton from '@portal/components/AuthenticationButton/AuthenticationButton.vue'

import { ARRANGEMENT_OVERVIEW, HOME, MY_REQUESTS_OVERVIEW, MY_MESSAGES } from '@shared/router/names'
import type { Link } from '@shared/types/link'

export const useAppHeaderLinks = () => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  const leftLinks: Link[] = [
    {
      name: HOME,
      label: translate('app.name'),
      icon: 'home'
    }
  ]

  const rightLinks: Ref<Link[]> = computed(() => {
    if (!isLoggedIn.value) return []
    return [
      {
        name: ARRANGEMENT_OVERVIEW,
        label: translate('pages.arrangements-overview.title')
      },
      {
        name: MY_REQUESTS_OVERVIEW,
        label: translate('pages.my-requests-overview.title'),
        badge: 2 // @TODO: get from API/store
      },
      {
        name: MY_MESSAGES,
        label: translate('pages.my-messages-overview.title'),
        badge: 4 // @TODO: get from API/store
      }
    ]
  })

  return {
    leftLinks,
    rightLinks,
    AuthComponent: AuthenticationButton
  }
}
