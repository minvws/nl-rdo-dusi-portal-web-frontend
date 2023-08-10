function flattenDeep(items: any[], key: string): any[] {
  return items.reduce((target, item) => {
    if (Array.isArray(item[key])) {
      return [...target, item, ...flattenDeep(item[key], key)]
    }
    return [...target, item]
  }, [])
}

export function getDeepProps(target: any[], key: string, prop: string): any[] {
  return flattenDeep(target, key)
    .map((item: Record<string, any[]>) => item[prop])
    .filter((value: unknown) => value !== undefined)
}
