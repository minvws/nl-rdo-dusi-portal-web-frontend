import type { ValidationError } from '@shared/types/field'
import { InputType } from '@shared/types/input'

import { ref, computed } from 'vue'
import { useJsonFormsControl, useJsonFormsEnumControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useCustomControlInput } from '@shared/composables/form/useCustomControlInput'
import { useFieldChange, useFieldType } from '@shared/composables/form/useField'
import { useFormConditionalIsRequired } from '@shared/composables/form/useFormConditionalIsRequired'
import { useFormConditionalRequiredError } from '@shared/composables/form/useFormConditionalRequiredError'
import { useForms } from '@shared/composables/form/useForms'

export const useCustomControl = (props: any) => {
  const error = ref<ValidationError | null>(null)

  const type = useFieldType(props.schema, props.uischema)
  const $props =
    type === InputType.SELECT ? useJsonFormsEnumControl(props) : useJsonFormsControl(props)

  const controlId = $props.control.value.path
  const { isConditionalRequired } = useFormConditionalIsRequired(controlId)
  const { conditionalError } = useFormConditionalRequiredError(controlId)
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
    controlId,
    error,
    errors,
    isConditionalRequired,
    onRemoteAction,
    onRemoteValidation,
    validationResult,
    ...useTouchedField(controlId),
    ...useVanillaControl($props, onHandleChange)
  }

  const isValidating = computed<boolean>(() => validationId.value === controlId)

  return {
    hideRequiredLabel,
    isReadOnly,
    isValidating,
    ...component,
    ...useCustomControlInput(component)
  }
}
