import { useFormStore } from '@/shared/store/useFormStore'
import { useFieldChange, useFieldType } from '@/shared/composables/useField'
import { useCustomControlInput } from '@/shared/composables/useCustomControlInput'
import { InputType } from '@/shared/type/input-types'
import { getControlId } from '@/shared/util/control-util'
import { useJsonFormsControl, useJsonFormsEnumControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

export const useCustomControl = (props: any) => {
  const { useTouchedField } = useFormStore()
  const id = getControlId(props.uischema.scope)

  const type = useFieldType(props.schema, props.uischema)
  const $props =
    type === InputType.SELECT ? useJsonFormsEnumControl(props) : useJsonFormsControl(props)
  const { onHandleChange } = useFieldChange($props as any)

  const component = {
    ...useVanillaControl($props, onHandleChange),
    ...useTouchedField(id)
  }
  return {
    ...component,
    ...useCustomControlInput(component)
  }
}
