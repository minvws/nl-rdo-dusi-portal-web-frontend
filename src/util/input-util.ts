const getInputElement = (id: string) => {
  return document.getElementById(id) as HTMLInputElement
}

export const setCursorAtEnd = (id: string) => {
  const el = getInputElement(id)
  if (!el) return
  setTimeout(() => {
    el.selectionStart = el.selectionEnd = el.value?.length ?? 0
  })
}
