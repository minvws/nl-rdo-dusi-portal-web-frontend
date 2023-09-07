import { Rel } from '@shared/external-links'

export const openExternalLink = (url: string, target = '_self') => {
  window.open(url, target, [Rel.NO_OPENER, Rel.NO_REFERRER].join(','))
}
