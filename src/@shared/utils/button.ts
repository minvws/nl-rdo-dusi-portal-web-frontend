export function toggleAriaExpanded(button?: HTMLElement, isExpanded?: boolean): boolean | void {
  if (!button || !button.hasAttribute('aria-expanded')) {
    return
  }

  const needsToggle = button.getAttribute('aria-expanded') === (isExpanded ? 'true' : 'false')

  if (needsToggle) {
    button.click()
  }

  return true
}
