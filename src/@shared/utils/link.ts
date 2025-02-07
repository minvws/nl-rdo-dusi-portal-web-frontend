import { Rel } from '@shared/external-links'

export function openExternalLink(url: string, target = '_self'): void {
  window.open(url, target, [Rel.NO_OPENER, Rel.NO_REFERRER].join(','))
}
