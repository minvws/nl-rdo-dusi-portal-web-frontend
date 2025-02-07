export function toNestedObject(obj: Record<string, unknown>): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key of Object.keys(obj)) {
    const keys = key.split('.')
    let nested = result

    for (let i = 0; i < keys.length; i++) {
      const current = keys[i]

      if (!nested[current]) {
        if (i === keys.length - 1) {
          nested[current] = obj[key]
        } else {
          nested[current] = {}
        }
      }
      nested = nested[current]
    }
  }

  return result
}

export function getValueFromKey(obj: any, key: string): string | undefined {
  if (!obj) return undefined
  if (key in obj) return obj[key]

  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      const result = getValueFromKey(obj[prop], key)
      if (result !== undefined) {
        return result
      }
    }
  }

  return undefined
}
