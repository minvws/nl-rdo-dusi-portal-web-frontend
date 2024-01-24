import type { Ref } from 'vue'
import type { Control } from '@shared/types/field'
import type { FormValue, FormError, FormErrors } from '@shared/types/form'
import type { ControlEvent } from '@shared/types/control'

import { computed, nextTick } from 'vue'
import { getControlId, getInputId } from '@shared/utils/control'

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
  handleChange,
  controlId,
  onRemoteValidation,
  errors
}: {
  error: Ref<string>
  control: Ref<Control>
  isFocused: Ref<boolean>
  setTouchedField: (_touched: boolean) => void
  onChange: (_event: Event) => void
  handleChange: (_path: string, _value: FormValue) => void
  onRemoteValidation: (_id?: string) => Promise<void>
  controlId: string
  errors: Ref<FormError[]>
}) => {
  const handleRemoteValidation = async (type: ControlEvent) => {
    // trigger remote validation when type is in list of validations
    if (!control.value.uischema.options?.validation?.includes(type)) return
    await onRemoteValidation(controlId)
    if (type !== 'onValid') return
    // input is validating and disabled, restore focus on element after validation
    const inputId = getInputId(control.value)
    document.getElementById(inputId)?.focus()
  }
  const updateValue = (type: ControlEvent) => {
    handleChange(getControlId(control.value.id), getValue(type, control.value, control.value.data))
    handleRemoteValidation(type)
  }

  const isValid = computed<boolean>(() => {
    return !errors.value?.find((error: FormError) => {
      const { instancePath, params } = error as FormError & { instancePath: string }
      if (!instancePath) {
        return params?.missingProperty === controlId
      }
      return getControlId(instancePath) === controlId
    })
  })

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
      nextTick(() => {
        if (!isValid.value) return
        updateValue('onValid')
      })
    },
    onBeforeChange(e: Event) {
      error.value = ''
      onChange(e)
    }
  }
}
