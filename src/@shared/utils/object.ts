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
