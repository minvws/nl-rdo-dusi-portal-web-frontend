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

function getInputAutoCompleteAttrs(control: Control) {
  switch (control.schema.format) {
    case 'email':
      return {
        autocomplete: 'username'
      }
    case 'password':
      return {
        autocomplete: 'current-password'
      }
  }
}

export function getInputAttrs(props: { type: InputType; control: Control }) {
  const { type, control } = props
  const {
    schema: {
      minimum,
      maximum,
      minLength: minlength,
      maxLength: maxlength,
      formatMinimum,
      formatMaximum
    }
  } = control

  return {
    min: minimum ?? formatMinimum,
    max: maximum ?? formatMaximum,
    minlength,
    maxlength,
    ...getInputAutoCompleteAttrs(control),
    type: getInputType(type)
  }
}
