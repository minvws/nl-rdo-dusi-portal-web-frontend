import type { Control } from '@shared/types/field'

import { InputType } from '@shared/types/input'

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
function getInputType(type: InputType) {
  if (Object.values(InputType).includes(type)) {
    return type
  }
  return InputType.TEXT
}

function createAutoComplete(autocomplete: string) {
  return {
    autocomplete
  }
}

function getInputAutoCompleteAttrs({ schema: { updatePassword, format } }: Control) {
  if (updatePassword) return createAutoComplete('new-password')

  switch (format) {
    case InputType.EMAIL:
      return createAutoComplete('username')
    case InputType.PASSWORD:
      return createAutoComplete('current-password')
  }
}

export function getInputAttrs(props: { type: InputType; control: Control }) {
  const { type, control } = props
  const {
    schema: { minimum: min, maximum: max, minLength: minlength, maxLength: maxlength }
  } = control
  return {
    min,
    max,
    minlength,
    maxlength,
    ...getInputAutoCompleteAttrs(control),
    type: getInputType(type)
  }
}
