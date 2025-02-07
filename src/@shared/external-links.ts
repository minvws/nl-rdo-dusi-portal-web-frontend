export const Rel = {
  NO_OPENER: 'noopener',
  NO_REFERRER: 'noreferrer',
  EXTERNAL: 'external'
}

export const external = [Rel.NO_OPENER, Rel.NO_REFERRER, Rel.EXTERNAL].join(' ')

export const notFoundLoggedOutRedirectLink = 'https://www.dus-i.nl'

export const urls = {
  about: 'https://www.dus-i.nl/over-ons',
  abuse: 'https://www.dus-i.nl/misbruik-en-fraude',
  accessibilityStatement: 'https://www.toegankelijkheidsverklaring.nl/register/11291',
  attachments: 'https://loremipsum.dusi.nl',
  avg: 'https://autoriteitpersoonsgegevens.nl/nl/onderwerpen/algemene-informatie-avg/rechten-van-betrokkenen',
  contact: 'https://www.dus-i.nl/contact',
  copyright: 'https://www.dus-i.nl/copyright',
  customerSatisfaction:
    'https://klantmonitor-enq.onderzoekdoen.nl/?t=kuaqchdk&attributes=subsidiecode:',
  disagree: 'https://www.dus-i.nl/oneens-met-dus-i',
  disclaimer: 'https://www.dus-i.nl/disclaimer',
  documents: 'https://www.dus-i.nl/documenten',
  grant: 'https://www.dus-i.nl/subsidies',
  grantProcess: 'https://www.dus-i.nl/subsidieproces',
  law: 'https://www.dus-i.nl/informatie-opvragen-bij-dus-i',
  privacy:
    'https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/informatie-en-meldpunt-privacy',
  vulnerability: 'https://www.dus-i.nl/kwetsbaarheid-melden'
} as const

export const externalUrls: Record<string, { href: string; rel: string }> = {}

// parse the data in a format so it can be used in i18n
export const externalLinks = {}

for (const [key, href] of Object.entries(urls)) {
  externalUrls[key] = { href, rel: external }
}

for (const [name, values] of Object.entries(externalUrls)) {
  const link: Record<string, string> = {}

  for (const [key, value] of Object.entries(values)) {
    const prop = `${name}${key.charAt(0).toUpperCase()}${key.slice(1)}`
    link[prop] = value
  }

  Object.assign(externalLinks, link)
}
