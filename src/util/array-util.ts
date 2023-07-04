const flattenDeep: any = (items: any[], key: string) => {
  return items.reduce((target, item) => {
    if (Array.isArray(item[key])) {
      return [...target, item, ...flattenDeep(item[key], key)]
    }
    return [...target, item]
  }, [])
}

export const getDeepProps = (target: any[], key: string, prop: string) => {
  return flattenDeep(target, key)
    .map((item: Record<string, any[]>) => item[prop])
    .filter((value: unknown) => value !== undefined)
}
