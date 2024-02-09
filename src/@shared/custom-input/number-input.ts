import type { Control } from '@shared/types/field'

import { InputType } from '@shared/types/input'

const formatNumber = (value: string) => {
  if (value === undefined || value === '') return ''
  const number = Number.parseFloat(`${value}`.replace(',', '.'))
  return Number.isNaN(number) ? value : number
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
    return formatNumber(value)
  }
}
