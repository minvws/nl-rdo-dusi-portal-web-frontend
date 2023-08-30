export const mergeElements = (elementsTo: any, elementsFrom: any, target: string) => {
  const path = target.split('.').map(key => {
    const index = parseInt(key)
    if (Number.isNaN(index)) return key
    return index
  })
  const result = JSON.parse(JSON.stringify(elementsTo))
  let destination = result
  for (let i = 0; i < path.length - 1; i++) destination = destination[path[i]]
  destination.splice(path[path.length - 1], 0, ...elementsFrom)
  return result
}
