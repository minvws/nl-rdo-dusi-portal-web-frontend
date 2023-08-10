import { type Control } from '@shared/types/field'

export function getControlId(id: string) {
  const parts = id.split('/')
  const lastPart = parts.pop()

  if (lastPart) {
    return lastPart
  }

  throw new Error('Invalid ID')
}

export function getLinkedControlId(id: string) {
  const parsed = id.split('/properties/')
  parsed.shift()
  return parsed
}

export function getInputAttrs(control: Control) {
  const {
    schema: { minimum: min, maximum: max, minLength: minlength, maxLength: maxlength }
  } = control

  return {
    min,
    max,
    minlength,
    maxlength
  }
}
