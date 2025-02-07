export function getA11yErrorId(id: string, index?: number): string {
  return index ? `${id}-${index}-error` : `${id}-error`
}

export function getA11yExplanationId(id: string, index?: number): string {
  return index ? `${id}-${index}-explanation` : `${id}-explanation`
}

export function getA11yInputId(id: string, index?: number): string {
  return index ? `${id}-${index}-input` : `${id}-input`
}

export function getA11yValidationId(id: string, index?: number): string {
  return index ? `${id}-${index}-validation-result` : `${id}-validation-result`
}
