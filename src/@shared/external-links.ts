export const Rel = {
  NO_OPENER: 'noopener',
  NO_REFERRER: 'noreferrer',
  EXTERNAL: 'external'
} as const

export const external = [Rel.NO_OPENER, Rel.NO_REFERRER, Rel.EXTERNAL].join(' ')

export const notFoundLoggedOutRedirectLink = 'https://www.dus-i.nl'

export const grantLink = {
  href: 'https://www.dus-i.nl/subsidies',
  rel: external
}

export const grantProcessLink = {
  href: 'https://www.dus-i.nl/subsidieproces',
  rel: external
}

export const contactLink = {
  href: 'https://www.dus-i.nl/contact',
  rel: external
}

// parse the data in a format so it can be used in i18n
export const externalLinks = Object.entries({
  grantLink,
  grantProcessLink,
  contactLink
}).reduce((cul, [name, values]) => {
  const link = Object.entries(values).reduce((cul, [key, value]: [string, string]) => {
    const prop = `${name}${key.charAt(0).toUpperCase()}${key.slice(1)}`
    return { ...cul, [prop]: value }
  }, {})
  return { ...cul, ...link }
}, {})
