import type { Control } from '@shared/types/field'
import { InputType } from '@shared/types/input'

import { isInteger, toInteger } from '@shared/utils/number'

const formatInteger = (value: string | number) => {
  if (value === undefined || value === '') {
    return ''
  }

  const number = toInteger(value)

  return isInteger(number) ? number : value
}

const isIntegerInput = (control: Control) => {
  switch (control.schema.type as InputType) {
    case InputType.INTEGER: {
      return true
    }
    default: {
      return false
    }
  }
}

export default {
  test(control: Control) {
    return isIntegerInput(control)
  },
  onChange(value: string) {
    return formatInteger(value)
  }
}
