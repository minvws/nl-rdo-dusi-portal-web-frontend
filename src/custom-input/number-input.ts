import type { Control } from '@/type/field-types'
import { InputType } from '@/type/input-types'

const formatNumber = (value: string) => {
  if (value === undefined || value === '') return ''
  const number = parseFloat(`${value}`.replace(',', '.'))
  return !Number.isNaN(number) ? number : value
}

const isNumberInput = (control: Control) => {
  switch (control.schema.type as InputType) {
    case InputType.NUMBER:
      return true
  }
  return false
}

export default {
  test(control: Control) {
    return isNumberInput(control)
  },
  onChange(value: string) {
    return formatNumber(value)
  }
}
