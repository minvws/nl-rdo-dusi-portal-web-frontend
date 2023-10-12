import type { Ref } from 'vue'

import { ref } from 'vue'
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
  const { useTouchedField, isReadOnly, hideRequiredLabel } = useForms()
  const error: Ref<string> = ref('')

  const id = getControlId(props.uischema.scope)
  const type = useFieldType(props.schema, props.uischema)
  const $props =
    type === InputType.SELECT ? useJsonFormsEnumControl(props) : useJsonFormsControl(props)
  const { onHandleChange } = useFieldChange({ error, ...($props as any) })

  const component = {
    error,
    ...useVanillaControl($props, onHandleChange),
    ...useTouchedField(id),
    conditionalError: useFormConditionalRequiredError(id),
    isConditionalRequired: useFormConditionalIsRequired(id)
  }

  return {
    isReadOnly,
    hideRequiredLabel,
    ...component,
    ...useCustomControlInput(component)
  }
}
