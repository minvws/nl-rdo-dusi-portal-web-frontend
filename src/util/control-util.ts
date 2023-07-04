export const getControlId = (id: string) => {
  return id.split('/').pop()!
}

export const getLinkedControlId = (id: string) => {
  const parsed = id.split('/properties/')
  parsed.shift()
  return parsed
}
