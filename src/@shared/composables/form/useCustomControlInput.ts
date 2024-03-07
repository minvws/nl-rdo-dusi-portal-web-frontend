import type { Ref } from 'vue'
import type { Control } from '@shared/types/field'
import type { FormValue, FormError } from '@shared/types/form'
import type { ValidationError, ControlEvent } from '@shared/types/field'

import { computed, nextTick } from 'vue'

import { useA11yStore } from '@shared/store/useA11yStore'

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
  error: Ref<ValidationError | null>
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
  const a11yStore = useA11yStore()

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
    const noValidation = !control.value.uischema.options?.validation?.includes(type)
    const isFileInput = Boolean(control.value.uischema.options?.maxFileSize)

    if (noValidation || isFileInput) {
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

  function onError({ id, message }: { id: string; message: string }): void {
    a11yStore.addId(id)
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
    const { id } = event.target as HTMLInputElement

    a11yStore.removeId(id)
    error.value = null

    onChange(event)
    updateValue('onInput')
    nextTick(() => {
      if (isValid.value) {
        updateValue('onValid')
      }
    })
  }

  function onBeforeChange(event: Event): void {
    error.value = null
    onChange(event)
  }

  return {
    error,
    onError,
    onFocus,
    onBlur,
    onInputChange,
    onBeforeChange
  }
}
