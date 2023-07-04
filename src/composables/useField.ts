import { FieldType } from '@/type/field-types'
import { useFormStore } from '@/store/useFormStore'
import { InputType } from '@/type/input-types'
import { formatFile } from '@/util/format-util'
import { computed } from 'vue'
import type { JsonSchema, UISchemaElement } from '@jsonforms/core'
import { type Control, type Field } from '@/type/field-types'

const getFieldProp = (control: Control) => {
  const {
    schema: { type }
  } = control
  switch (type) {
    case FieldType.BOOLEAN:
      return 'checked'
    default:
      return 'value'
  }
}
export const useFieldChange = ({ control }: Field) => {
  const { addOrRemoveFile } = useFormStore()
  return {
    addOrRemoveFile,
    onHandleChange: (target: HTMLInputElement) => {
      const prop = getFieldProp(control.value)
      const isFile = control.value.schema.file
      if (isFile) {
        // when file, add or remove from fileStore
        addOrRemoveFile(control.value.id, target)
      }
      if (target[prop] === '') {
        // we need to set the value to undefined when the value
        // is an empty to trigger validation
        return undefined
      }
      return target[prop]
    }
  }
}

export const useFieldValue = ({
  control,
  appliedOptions = {}
}: {
  control: Control
  appliedOptions: Record<string, string>
}) => {
  const {
    data,
    schema: { file, type }
  } = control
  const prop = getFieldProp(control)
  if (file) {
    // file input
    const { accept } = appliedOptions
    return {
      [prop]: data,
      accept
    }
  }
  switch (type) {
    case FieldType.BOOLEAN:
      return { [prop]: !!data }
    default:
      return { [prop]: data }
  }
}

const fieldTypes = Object.values(InputType)

export const useFieldType = (schema: JsonSchema, { options = {} }: UISchemaElement) => {
  const extend = schema as JsonSchema & Record<InputType, boolean> & { format?: InputType }
  const key = fieldTypes.find(key => extend[key])
  if (key) return key
  const { format, type } = { ...options, ...extend }
  switch (type) {
    case FieldType.BOOLEAN:
      return InputType.CHECKBOX
  }

  if (format && fieldTypes.includes(format)) {
    return format
  }
  return InputType.TEXT
}

export const useFieldFileRemove = ({ id }: { id: string }) => {
  const { getFile, addOrRemoveFile } = useFormStore()
  const file = computed(() => getFile(id))
  const hasFile = computed(() => !!file.value)
  const label = computed(() => formatFile(file.value?.name))

  return {
    hasFile,
    label,
    addOrRemoveFile
  }
}

export const useField = ({
  input,
  control,
  handleChange
}: {
  input: { id: string; type: InputType }
  control: Control
  handleChange?: (path: string, value: any) => void
}) => {
  switch (input.type) {
    case InputType.SELECT:
      return {
        tag: 'FormSelectControl',
        props: { ...input, options: control.options }
      }
    case InputType.FILE:
      // when a input of type file restores, it will throw an error:
      // 'This input element accepts a filename, which may only be programmatically set to the empty string'
      return {
        props: { ...input, value: undefined, control, handleChange },
        tag: 'FormFileControl'
      }
    case InputType.RADIO:
      return {
        props: {
          ...input,
          items: control.schema.enum?.map(radio => {
            return {
              ...input,
              id: radio,
              value: radio,
              checked: radio === control.data
            }
          })
        },
        tag: 'FormRadioControl'
      }
  }
  return {
    props: input,
    tag: 'FormTextControl'
  }
}
