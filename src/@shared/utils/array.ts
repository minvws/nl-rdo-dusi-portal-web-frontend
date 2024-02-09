export function flattenDeep(items: any[], key: string): any[] {
  const result: any[] = []

  for (const item of items) {
    if (Array.isArray(item[key])) {
      result.push(item, ...flattenDeep(item[key], key))
    } else {
      result.push(item)
    }
  }

  return result
}

export function getDeepProps(target: any[], key: string, prop: string): any[] {
  return flattenDeep(target, key)
    .map((item: Record<string, any[]>) => item[prop])
    .filter((value: unknown) => value !== undefined)
}
