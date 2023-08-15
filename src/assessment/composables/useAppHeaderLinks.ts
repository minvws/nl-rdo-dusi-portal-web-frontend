import type { Link } from '@shared/types/link'
import { HOME, MY_REQUESTS_OVERVIEW } from '@shared/router/names'
import { translate } from '@shared/i18n'

export const useAppHeaderLinks = () => {
  const leftLinks: Link[] = [
    {
      name: HOME,
      label: translate('app.name'),
      icon: 'home'
    },
    {
      name: MY_REQUESTS_OVERVIEW,
      label: translate('pages.my-requests-overview.title')
    }
  ]
  const rightLinks: Link[] = []

  return {
    leftLinks,
    rightLinks,
    hasAutentication: false
  }
}
