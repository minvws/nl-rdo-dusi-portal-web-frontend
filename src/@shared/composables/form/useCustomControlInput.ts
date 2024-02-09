import type { Ref } from 'vue'
import type { Control } from '@shared/types/field'
import type { FormValue, FormError } from '@shared/types/form'
import type { ControlEvent } from '@shared/types/field'

import { computed, nextTick } from 'vue'
import { getControlId, getInputId } from '@shared/utils/control'

// auto import from custom-input
const customInputs = Object.values(import.meta.glob('@shared/custom-input/*.ts', { eager: true }))
  .map((module: any) => module?.default)
  .filter((tester) => !!tester)

export function getValue(type: ControlEvent, control: Control, value: FormValue): FormValue {
  for (const input of customInputs) {
    if (input.test(control) && input[type]) {
      value = input[type](value, control)
    }
  }

  return value
}

type Props = {
  control: Ref<Control>
  controlId: string
  error: Ref<string>
  errors: Ref<FormError[]>
  handleChange: (_path: string, _value: FormValue) => void
  isFocused: Ref<boolean>
  onChange: (_event: Event) => void
  onRemoteValidation: (_id?: string) => Promise<void>
  setTouchedField: (_touched: boolean) => void
}

export const useCustomControlInput = ({
  control,
  controlId,
  error,
  errors,
  handleChange,
  isFocused,
  onChange,
  onRemoteValidation,
  setTouchedField
}: Props) => {
  const isValid = computed<boolean>(
    () =>
      !errors.value?.some((error: FormError) => {
        const { instancePath, params } = error as FormError & { instancePath: string }

        if (!instancePath) {
          return params?.missingProperty === controlId
        }

        return getControlId(instancePath) === controlId
      })
  )

  async function handleRemoteValidation(type: ControlEvent) {
    // trigger remote validation when type is in list of validations
    if (!control.value.uischema.options?.validation?.includes(type)) {
      return
    }

    await onRemoteValidation(controlId)

    if (type !== 'onValid') {
      return
    }

    // input is validating and disabled, restore focus on element after validation
    const inputId = getInputId(control.value)
    // we need to use the attribute selector here because the id can start with special characters (e.g. #)
    const element = document.querySelector(`[id="${inputId}]`)
    const validInputElement = element && element instanceof HTMLInputElement && !element.disabled

    if (validInputElement) {
      element.focus()
    }
  }

  function updateValue(type: ControlEvent) {
    const value = getValue(type, control.value, control.value.data)
    const controlId = getControlId(control.value.id)

    handleChange(controlId, value)
    handleRemoteValidation(type)
  }

  function onError(message?: string): void {
    error.value = message ?? ''
  }

  function onFocus(): void {
    isFocused.value = true
    updateValue('onFocus')
  }

  function onBlur(): void {
    isFocused.value = false
    setTouchedField(true)
    updateValue('onBlur')
  }

  function onInput(event: InputEvent): void {
    error.value = ''
    onChange(event)
    updateValue('onInput')
    nextTick(() => {
      if (!isValid.value) return
      updateValue('onValid')
    })
  }

  function onBeforeChange(event: InputEvent): void {
    error.value = ''
    onChange(event)
  }

  return {
    error,
    onError,
    onFocus,
    onBlur,
    onInput,
    onBeforeChange
  }
}
