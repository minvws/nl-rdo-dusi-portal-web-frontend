export const toggleAriaExpanded = (button?: HTMLElement, isExpanded?: boolean) => {
  if (!button) return
  if (!button.hasAttribute('aria-expanded')) return
  const needsToggle = button.getAttribute('aria-expanded') === (isExpanded ? 'true' : 'false')
  if (!needsToggle) return
  button.click()
  return true
}
