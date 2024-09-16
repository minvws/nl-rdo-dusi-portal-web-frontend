import type { ValidationError } from '@shared/types/field'
import { InputType } from '@shared/types/input'

import { ref, computed } from 'vue'
import { useJsonFormsControl, useJsonFormsEnumControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useCustomControlInput } from '@shared/composables/form/useCustomControlInput'
import {
  fieldTypeSupportsReadonly,
  isFieldReadonly,
  useFieldChange,
  useFieldType
} from "@shared/composables/form/useField"
import { useFormConditionalIsRequired } from '@shared/composables/form/useFormConditionalIsRequired'
import { useFormConditionalRequiredError } from '@shared/composables/form/useFormConditionalRequiredError'
import { useForms } from '@shared/composables/form/useForms'

export const useCustomControl = (props: any) => {
  const error = ref<ValidationError | null>(null)

  const formatOption = props.uischema.options?.format || undefined
  const $props =
    formatOption === InputType.SELECT ? useJsonFormsEnumControl(props) : useJsonFormsControl(props)

  const fieldReadonly = isFieldReadonly($props.control.value.schema, $props.control.value.uischema)
  const fieldType = useFieldType($props.control.value.schema, $props.control.value.uischema, fieldReadonly)
  const fieldIsReadonly = fieldReadonly && fieldTypeSupportsReadonly(fieldType)

  const controlPath = $props.control.value.path
  const { isConditionalRequired } = useFormConditionalIsRequired(controlPath)
  const { conditionalError } = useFormConditionalRequiredError(controlPath)
  const { onHandleChange } = useFieldChange({ ...($props as any) })
  const {
    errors,
    hideRequiredLabel,
    isReadOnly,
    onRemoteAction,
    onRemoteValidation,
    useTouchedField,
    validationId,
    validationResult
  } = useForms()

  const component = {
    conditionalError,
    controlPath,
    error,
    errors,
    fieldType,
    isConditionalRequired,
    onRemoteAction,
    onRemoteValidation,
    validationResult,
    ...useTouchedField(controlPath),
    ...useVanillaControl($props, onHandleChange)
  }

  const isValidating = computed<boolean>(() => validationId.value === controlPath)

  return {
    hideRequiredLabel,
    isReadOnly,
    isFieldReadonly: fieldIsReadonly,
    isValidating,
    ...component,
    ...useCustomControlInput(component)
  }
}
