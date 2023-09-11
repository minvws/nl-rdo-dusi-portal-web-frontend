export const Rel = {
  NO_OPENER: 'noopener',
  NO_REFERRER: 'noreferrer',
  EXTERNAL: 'external'
} as const

export const external = [Rel.NO_OPENER, Rel.NO_REFERRER, Rel.EXTERNAL].join(' ')

export const notFoundLoggedOutRedirectLink = 'https://www.dus-i.nl'

export const urls = {
  attachments: 'https://loremipsum.dusi.nl',
  grant: 'https://www.dus-i.nl/subsidies',
  grantProcess: 'https://www.dus-i.nl/subsidieproces',
  contact: 'https://www.dus-i.nl/contact',
  documents: 'https://www.dus-i.nl/documenten',
  abuse: 'https://www.dus-i.nl/misbruik-en-fraude',
  disagree: 'https://www.dus-i.nl/oneens-met-dus-i',
  law: 'https://www.dus-i.nl/wet-open-overheid',
  about: 'https://www.dus-i.nl/over-ons',
  copyright: 'https://www.dus-i.nl/copyright',
  disclaimer: 'https://www.dus-i.nl/disclaimer',
  vulnerability: 'https://www.dus-i.nl/kwetsbaarheid-melden',
  privacy:
    'https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/informatie-en-meldpunt-privacy',
  avg: 'https://autoriteitpersoonsgegevens.nl/nl/onderwerpen/algemene-informatie-avg/rechten-van-betrokkenen'
} as const

export const externalUrls = Object.entries(urls).reduce(
  (cul, [key, href]) => {
    return {
      [key]: {
        href,
        rel: external
      },
      ...cul
    }
  },
  {} as Record<string, { href: string; rel: string }>
)

// parse the data in a format so it can be used in i18n
export const externalLinks = Object.entries(externalUrls).reduce((cul, [name, values]) => {
  const link = Object.entries(values).reduce((cul, [key, value]: [string, string]) => {
    const prop = `${name}${key.charAt(0).toUpperCase()}${key.slice(1)}`
    return { ...cul, [prop]: value }
  }, {})
  return { ...cul, ...link }
}, {})
