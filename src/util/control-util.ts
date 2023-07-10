export const getControlId = (id: string) => {
  const parts = id.split('/')
  const lastPart = parts.pop()

  if (lastPart) {
    return lastPart
  }

  throw new Error('Invalid ID')
}

export const getLinkedControlId = (id: string) => {
  const parsed = id.split('/properties/')
  parsed.shift()
  return parsed
}
