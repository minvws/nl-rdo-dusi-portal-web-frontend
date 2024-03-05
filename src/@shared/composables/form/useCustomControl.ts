import type { ValidationError } from '@shared/types/field'

import { ref, computed } from 'vue'
import { useJsonFormsControl, useJsonFormsEnumControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

import { useForms } from '@shared/composables/form/useForms'
import { InputType } from '@shared/types/input'
import { getControlId } from '@shared/utils/control'
import { useFieldChange, useFieldType } from '@shared/composables/form/useField'
import { useCustomControlInput } from '@shared/composables/form/useCustomControlInput'
import { useFormConditionalRequiredError } from '@shared/composables/form/useFormConditionalRequiredError'
import { useFormConditionalIsRequired } from '@shared/composables/form/useFormConditionalIsRequired'

export const useCustomControl = (props: any) => {
  const error = ref<ValidationError | null>(null)

  const controlId = getControlId(props.uischema.scope)
  const type = useFieldType(props.schema, props.uischema)
  const { isConditionalRequired } = useFormConditionalIsRequired(controlId)
  const { conditionalError } = useFormConditionalRequiredError(controlId)
  const $props =
    type === InputType.SELECT ? useJsonFormsEnumControl(props) : useJsonFormsControl(props)
  const { onHandleChange } = useFieldChange({ error, ...($props as any) })
  const {
    useTouchedField,
    isReadOnly,
    hideRequiredLabel,
    validationResult,
    onRemoteValidation,
    validationId,
    errors
  } = useForms()

  const component = {
    conditionalError,
    controlId,
    error,
    errors,
    isConditionalRequired,
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
