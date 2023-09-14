import { type Ref } from 'vue'
import { getControlId } from '@shared/utils/control'
import type { Control } from '@shared/types/field'
import type { FormValue } from '@shared/types/form'

type ControlEvent = 'onFocus' | 'onBlur' | 'onInput' | 'onChange'

// auto import from custom-input
const customInputs = Object.values(import.meta.glob('@shared/custom-input/*.ts', { eager: true }))
  .map((module: any) => module?.default)
  .filter(tester => !!tester)

export const getValue = (type: ControlEvent, control: Control, value: FormValue) => {
  return customInputs.reduce((value, input: any) => {
    return input.test(control) && input[type] ? input[type](value, control) : value
  }, value)
}

export const useCustomControlInput = ({
  error,
  control,
  isFocused,
  setTouchedField,
  onChange,
  handleChange
}: {
  error: Ref<string>
  control: Ref<Control>
  isFocused: Ref<boolean>
  setTouchedField: (_touched: boolean) => void
  onChange: (_event: Event) => void
  handleChange: (_path: string, _value: FormValue) => void
}) => {
  const updateValue = (type: ControlEvent) => {
    handleChange(getControlId(control.value.id), getValue(type, control.value, control.value.data))
  }

  return {
    error,
    onError(message?: string) {
      error.value = message ?? ''
    },
    onFocus() {
      isFocused.value = true
      updateValue('onFocus')
    },
    onBlur() {
      isFocused.value = false
      setTouchedField(true)
      updateValue('onBlur')
    },
    onInput(e: Event) {
      error.value = ''
      onChange(e)
      updateValue('onInput')
    }
  }
}
