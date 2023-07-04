import type { Link } from '@/type/link-types'
import name from '@/router/name'
import { translate } from '@/i18n'

const useHeaderLinksLeft = (): Link[] => [
  {
    name: name.HOME,
    label: translate('app.name'),
    icon: 'home'
  },
  {
    name: name.ARRANGEMENT_OVERVIEW,
    label: translate('pages.arrangements-overview.title')
  },
  {
    name: name.MY_FILE_OVERVIEW,
    label: translate('pages.my-file-overview.title'),
    badge: 2 // @TODO
  },
  {
    name: name.MY_MESSAGES,
    label: translate('pages.my-messages-overview.title'),
    badge: 4 // @TODO
  }
]

const useHeaderLinksRight = (): Link[] => [
  {
    name: name.LOGIN,
    label: translate('pages.login.title'),
    icon: 'user'
  }
]

export const useHeaderLinks = () => [useHeaderLinksLeft(), useHeaderLinksRight()]
export const useFooterLinks = (): Link[] => [
  {
    name: name.HOME,
    label: translate('app.name')
  },
  {
    name: name.ARRANGEMENT_OVERVIEW,
    label: translate('pages.arrangements-overview.title')
  },
  {
    name: name.ARRANGEMENT_DETAILS,
    params: { id: '123' },
    label: 'Regeling 123'
  }
]
