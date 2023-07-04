import { useFormStore } from '@/store/useFormStore'
import { useFieldChange, useFieldType } from '@/composables/useField'
import { InputType } from '@/type/input-types'
import { getControlId } from '@/util/control-util'
import { useJsonFormsControl, useJsonFormsEnumControl } from '@jsonforms/vue'
import { useVanillaControl } from '@jsonforms/vue-vanilla'

export const useCustomControl = (props: any) => {
  const { useTouchedField } = useFormStore()
  const id = getControlId(props.uischema.scope)

  const type = useFieldType(props.schema, props.uischema)
  const $props =
    type === InputType.SELECT ? useJsonFormsEnumControl(props) : useJsonFormsControl(props)
  const { onHandleChange } = useFieldChange($props as any)

  return {
    ...useVanillaControl($props, onHandleChange),
    ...useTouchedField(id)
  }
}
