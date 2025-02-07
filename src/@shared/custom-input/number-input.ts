import type { Control } from '@shared/types/field'
import { InputType } from '@shared/types/input'

import { isFloat, toFloat } from '@shared/utils/number'

const formatFloat = (value: string) => {
  if (value === undefined || value === '') {
    return ''
  }

  const number = toFloat(value)

  return isFloat(number) ? number : value
}

const isNumberInput = (control: Control) => {
  switch (control.schema.type as InputType) {
    case InputType.NUMBER: {
      return true
    }
    default: {
      return false
    }
  }
}

export default {
  test(control: Control) {
    return isNumberInput(control)
  },
  onChange(value: string) {
    return formatFloat(value)
  }
}
