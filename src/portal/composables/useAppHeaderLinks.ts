import type { Link } from '@shared/types/link'
import { useAuthStore } from '@shared/store/useAuthStore'
import { storeToRefs } from 'pinia'
import { translate } from '@shared/i18n'
import { ARRANGEMENT_OVERVIEW, HOME, MY_FILE_OVERVIEW, MY_MESSAGES } from '@shared/router/names'
import { computed, type Ref } from 'vue'

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

  const rightLinks: Link[] = isLoggedIn.value ? [
    {
      name: ARRANGEMENT_OVERVIEW,
      label: translate('pages.arrangements-overview.title')
    },
    {
      name: MY_FILE_OVERVIEW,
      label: translate('pages.my-file-overview.title'),
      badge: 2 // @TODO: get from API/store
    },
    {
      name: MY_MESSAGES,
      label: translate('pages.my-messages-overview.title'),
      badge: 4 // @TODO: get from API/store
    }
  ] : []

  return {
    leftLinks,
    rightLinks,
    hasAutentication: true
  }
}
