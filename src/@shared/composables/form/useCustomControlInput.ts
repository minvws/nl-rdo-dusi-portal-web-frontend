import type { Ref } from 'vue'
import type { Control } from '@shared/types/field'
import type { FormValue, FormError } from '@shared/types/form'
import type { ValidationError, ControlEvent } from '@shared/types/field'

import { computed, nextTick } from 'vue'

import { getControlPath, getInputId } from '@shared/utils/control'

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
  controlPath: string
  error: Ref<ValidationError | null>
  errors: Ref<FormError[]>
  handleChange: (_path: string, _value: FormValue) => void
  isFocused: Ref<boolean>
  onChange: (_event: Event) => void
  onRemoteAction: () => Promise<void>
  onRemoteValidation: (_fieldName?: string) => Promise<void>
  setTouchedField: (_touched: boolean) => void
}

export const useCustomControlInput = ({
  control,
  controlPath,
  error,
  errors,
  handleChange,
  isFocused,
  onChange,
  onRemoteValidation,
  onRemoteAction,
  setTouchedField
}: Props) => {
  const isValid = computed<boolean>(
    () =>
      !errors.value?.some((error: FormError) => {
        const { instancePath, params } = error as FormError & { instancePath: string }

        if (!instancePath) {
          return params?.missingProperty === controlPath
        }

        return getControlPath(instancePath) === controlPath
      })
  )

  async function handleRemoteValidation(type: ControlEvent): Promise<void> {
    // trigger remote validation when type is in list of validations
    const noValidation = !control.value.uischema.options?.validation?.includes(type)

    if (noValidation) {
      return
    }

    await onRemoteValidation(controlPath)

    if (type !== 'onValid') {
      return
    }

    // Input is validating and disabled,
    // restore focus on element after remote validation.
    restoreFocus()
  }

  async function handleRemoteAction(type: ControlEvent): Promise<void> {
    const noAction = !control.value.uischema.options?.remoteAction?.includes(type)

    if (noAction) {
      return
    }

    await onRemoteAction()

    if (type !== 'onValid') {
      return
    }

    // Input is validating and disabled,
    // restore focus on element after remote action.
    restoreFocus()
  }

  function restoreFocus(): void {
    const inputId = getInputId(control.value)
    // we need to use the attribute selector here because the id can start with special characters (e.g. #)
    const element = document.querySelector(`[id="${inputId}"]`)
    const validInputElement = element && element instanceof HTMLInputElement && !element.disabled

    if (validInputElement) {
      element.focus()
    }
  }

  function updateValue(type: ControlEvent) {
    const value = getValue(type, control.value, control.value.data)

    if (value !== control.value.data) {
      handleChange(controlPath, value)
    }
    handleRemoteAction(type)
    handleRemoteValidation(type)
  }

  function onError({ id, message }: { id: string; message: string }): void {
    error.value = { id, message }
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

  function onInputChange(event: Event): void {
    error.value = null

    updateValue('onInput')
    onChange(event)
    nextTick(() => {
      if (isValid.value) {
        onValid()
      }
    })
  }

  function onBeforeChange(event: Event): void {
    error.value = null
    onChange(event)
  }

  function onValid(): void {
    updateValue('onValid')
  }

  function resetError(): void {
    error.value = null
  }

  return {
    error,
    onError,
    onFocus,
    onBlur,
    onInputChange,
    onBeforeChange,
    onValid,
    resetError
  }
}
