import { useFormStore } from '@shared/store/useFormStore'
import { InputType } from '@shared/types/input'
import { getControlId } from '@shared/utils/control'
import { useJsonFormsControl, useJsonFormsEnumControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'
import { useFieldChange, useFieldType } from '@shared/composables/useField'
import { useCustomControlInput } from '@shared/composables/useCustomControlInput'
import { useFormConditionalRequiredError } from '@shared/composables/useFormConditionalRequiredError'
import { useFormConditionalIsRequired } from '@shared/composables/useFormConditionalIsRequired'

export const useCustomControl = (props: any) => {
  const { useTouchedField } = useFormStore()
  const id = getControlId(props.uischema.scope)

  const type = useFieldType(props.schema, props.uischema)
  const $props =
    type === InputType.SELECT ? useJsonFormsEnumControl(props) : useJsonFormsControl(props)
  const { onHandleChange } = useFieldChange($props as any)

  const component = {
    ...useVanillaControl($props, onHandleChange),
    ...useTouchedField(id),
    conditionalError: useFormConditionalRequiredError(id),
    isConditionalRequired: useFormConditionalIsRequired(id)
  }
  return {
    ...component,
    ...useCustomControlInput(component)
  }
}
