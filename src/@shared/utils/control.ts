import type { Control } from '@shared/types/field'

import { InputType } from '@shared/types/input'

function getInputStep(
  { schema: { format } }: Control,
  step: number | undefined
): string | undefined {
  if (format === InputType.INTEGER) {
    return undefined
  }

  return step?.toString()
}

function getInputType(type: InputType) {
  if (Object.values(InputType).includes(type)) {
    return type
  }

  return InputType.TEXT
}

function getInputAutoCompleteAttrs({ schema: { updatePassword, format } }: Control) {
  if (updatePassword) {
    return 'new-password'
  }

  switch (format) {
    case InputType.EMAIL: {
      return 'username'
    }
    case InputType.PASSWORD: {
      return 'current-password'
    }
    default: {
      return 'off'
    }
  }
}

export function getControlPath(id: string) {
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

export function getInputId(control: Control) {
  const { id } = control
  return `${id}-input`
}

export function getInputAttrs(props: { type: InputType; control: Control }) {
  const { type, control } = props
  const {
    schema: {
      formatMaximum,
      formatMinimum,
      maximum,
      maxLength: maxlength,
      minimum,
      minLength: minlength,
      step
    }
  } = control

  return {
    autocomplete: getInputAutoCompleteAttrs(control),
    max: maximum ?? formatMaximum,
    maxlength,
    min: minimum ?? formatMinimum,
    minlength,
    step: getInputStep(control, step),
    rows: type === InputType.TEXTAREA ? 4 : undefined,
  }
}

export function isReadonlySupported(type: InputType): boolean {
  return type === InputType.TEXT || type === InputType.TEXTAREA
}
