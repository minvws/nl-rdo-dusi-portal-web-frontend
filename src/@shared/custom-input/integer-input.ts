import type { Control } from '@shared/types/field'
import { InputType } from '@shared/types/input'

const formatInteger = (value: string | number) => {
  const integer = parseFloat(`${value}`)
  return !Number.isNaN(integer) ? integer : value
}

const isNumberInput = (control: Control) => {
  switch (control.schema.type as InputType) {
    case InputType.INTEGER:
      return true
  }
  return false
}

export default {
  test(control: Control) {
    return isNumberInput(control)
  },
  onChange(value: string) {
    return formatInteger(value)
  }
}
