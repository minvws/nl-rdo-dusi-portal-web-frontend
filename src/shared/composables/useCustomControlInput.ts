import { ref, type Ref } from 'vue'
import { getControlId } from '@/shared/util/control-util'
import type { Control } from '@/shared/type/field-types'
import type { FormValue } from '@/shared/type/form-types'

type ControlEvent = 'onFocus' | 'onBlur' | 'onInput' | 'onChange'

// auto import from custom-input
const customInputs = Object.values(import.meta.glob('@/shared/custom-input/*.ts', { eager: true }))
  .map((module: any) => module?.default)
  .filter(tester => !!tester)

export const getValue = (type: ControlEvent, control: Control, value: FormValue) => {
  return customInputs.reduce((value, input: any) => {
    return input.test(control) && input[type] ? input[type](value, control) : value
  }, value)
}

export const useCustomControlInput = ({
  control,
  isFocused,
  setTouchedField,
  onChange,
  handleChange
}: {
  control: Ref<Control>
  isFocused: Ref<boolean>
  setTouchedField: (_touched: boolean) => void
  onChange: (_event: Event) => void
  handleChange: (_path: string, _value: FormValue) => void
}) => {
  const error = ref('')

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
      if ('errors' in control.value && control.value.errors) return
      // validate on input when input has errors
      onChange(e)
      updateValue('onInput')
    }
  }
}
