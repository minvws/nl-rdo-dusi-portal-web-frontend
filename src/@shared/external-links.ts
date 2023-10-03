export const Rel = {
  NO_OPENER: 'noopener',
  NO_REFERRER: 'noreferrer',
  EXTERNAL: 'external'
} as const

export const external = [Rel.NO_OPENER, Rel.NO_REFERRER, Rel.EXTERNAL].join(' ')

export const notFoundLoggedOutRedirectLink = 'https://www.dus-i.nl'

export const urls = {
  about: 'https://www.dus-i.nl/over-ons',
  abuse: 'https://www.dus-i.nl/misbruik-en-fraude',
  announcements: 'https://zoek.officielebekendmakingen.nl/stb-2018-141.html',
  attachments: 'https://loremipsum.dusi.nl',
  avg: 'https://autoriteitpersoonsgegevens.nl/nl/onderwerpen/algemene-informatie-avg/rechten-van-betrokkenen',
  conformance: 'https://www.w3.org/WAI/test-evaluate/conformance/',
  contact: 'https://www.dus-i.nl/contact',
  copyright: 'https://www.dus-i.nl/copyright',
  customerStatisfaction:
    'https://klantmonitor-enq.onderzoekdoen.nl/?t=kuaqchdk&attributes=subsidiecode:',
  disagree: 'https://www.dus-i.nl/oneens-met-dus-i',
  disclaimer: 'https://www.dus-i.nl/disclaimer',
  documents: 'https://www.dus-i.nl/documenten',
  evaluation: 'https://www.w3.org/WAI/standards-guidelines/earl/',
  grant: 'https://www.dus-i.nl/subsidies',
  grantProcess: 'https://www.dus-i.nl/subsidieproces',
  guideline: 'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32016L2102',
  law: 'https://www.dus-i.nl/wet-open-overheid',
  model: 'https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32018D1523',
  norm: 'https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf',
  overview:
    'https://www.toegankelijkheidsverklaring.nl/register?w=Ministerie+van+Volksgezondheid%2C+welzijn+en+sport',
  privacy:
    'https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/informatie-en-meldpunt-privacy',
  request: 'https://aanvraag.dus-i.nl',
  requirements: 'https://www.w3.org/TR/WCAG21/#conformance-requirements',
  standards: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
  testing: 'https://www.w3.org/WAI/standards-guidelines/act/',
  vulnerability: 'https://www.dus-i.nl/kwetsbaarheid-melden',
  webtool:
    'https://webtool.accessibility.nl/public/report/8N1OmxKRCuaLQUf6K5WQtg/melding/3PbRjK0OQleHZxGXM1QgXw~G'
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
