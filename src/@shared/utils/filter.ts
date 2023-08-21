import { log } from '@shared/utils/logger'

export const filterByValidTo = <T>(items: (T & { validTo?: string })[]) => {
  const now = Date.now()
  return items.filter(({ validTo }) => {
    if (!validTo) return true
    const isValid = now <= new Date(validTo).getTime()
    if (!isValid) {
      log(`entry is not valid anymore: now: '${now}' validTo: '${validTo}'`)
    }
    return isValid
  })
}
