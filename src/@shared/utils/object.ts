export const toNestedObject = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj).reduce((cul: Record<string, any>, key: string) => {
    const keys = key.split('.')
    let nested = cul

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
    return cul
  }, {})
}

export function mergeObjects(
  target: Record<string, any>,
  source: Record<string, any>
): Record<string, any> {
  const result = { ...target }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (!Object.prototype.hasOwnProperty.call(result, key)) {
        result[key] = source[key]
      } else if (typeof source[key] === 'object' && typeof result[key] === 'object') {
        result[key] = mergeObjects(result[key], source[key])
      }
    }
  }

  return result
}
