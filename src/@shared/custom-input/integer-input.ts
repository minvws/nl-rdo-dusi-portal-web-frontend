import type { Control } from '@shared/types/field'

import { InputType } from '@shared/types/input'

const formatInteger = (value: string | number) => {
  const integer = Number.parseFloat(`${value}`)
  return Number.isNaN(integer) ? value : integer
}

const isNumberInput = (control: Control) => {
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
    return isNumberInput(control)
  },
  onChange(value: string) {
    return formatInteger(value)
  }
}
