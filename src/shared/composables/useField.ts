import { computed } from 'vue'
import type { JsonSchema, UISchemaElement } from '@jsonforms/core'

import { useFilesStore } from '@/shared/store/useFilesStore'

import { InputType } from '@/shared/type/input-types'
import type { Control, Field } from '@/shared/type/field-types'

import { formatFile } from '@/shared/util/format-util'
import { getValue } from './useCustomControlInput'

function getFieldProp(control: Control) {
  switch (control.schema.type) {
    case 'boolean':
      return 'checked'
    default:
      return 'value'
  }
}

export const useFieldChange = ({ control }: Field) => {
  const { addOrRemoveFile } = useFilesStore()

  return {
    addOrRemoveFile,
    onHandleChange: (target: HTMLInputElement) => {
      const prop = getFieldProp(control.value)
      const value = target[prop]
      const isFile = control.value.schema.file

      if (isFile) {
        // when file, add or remove from fileStore
        addOrRemoveFile(control.value.id, target)
      }
      if (value === '' ?? value === undefined) {
        // we need to set the value to undefined when the value
        // is empty to trigger validation
        return undefined
      }
      return getValue('onChange', control.value, value)
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
    const { accept, maxFileSize } = appliedOptions
    return {
      [prop]: data,
      accept,
      maxFileSize
    }
  }
  switch (type) {
    case 'boolean':
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
    case 'boolean':
      return InputType.CHECKBOX
  }

  if (format && fieldTypes.includes(format)) {
    return format
  }
  return (type as InputType) ?? InputType.TEXT
}

export const useFieldFileRemove = ({ id }: { id: string }) => {
  const { getFile, addOrRemoveFile } = useFilesStore()
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
  handleChange?: (_path: string, _value: any) => void
}) => {
  switch (input.type) {
    case InputType.NUMBER:
    case InputType.INTEGER:
      return {
        tag: 'FormNumberControl',
        props: { ...input, control }
      }
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
    props: { ...input, control },
    tag: 'FormTextControl'
  }
}
