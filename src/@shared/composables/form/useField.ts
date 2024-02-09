import type { Ref } from 'vue'
import type { JsonSchema, UISchemaElement } from '@jsonforms/core'
import type { Control, Field } from '@shared/types/field'
import type { FormValue } from '@shared/types/form'

import { computed } from 'vue'

import { InputType } from '@shared/types/input'
import { formatFile } from '@shared/utils/format'

import { useFileStore } from '@shared/store/useFileStore'
import { getValue } from '@shared/composables/form/useCustomControlInput'

function getFieldProp(control: Control) {
  switch (control.schema.type) {
    case 'boolean': {
      return 'checked'
    }
    default: {
      return 'value'
    }
  }
}

type FieldChangeProps = Field & { error: Ref<string> }

export const useFieldChange = ({ control, error }: FieldChangeProps) => {
  const { addOrRemoveFile } = useFileStore()

  function onHandleChange(target: HTMLInputElement): FormValue | undefined {
    const prop = getFieldProp(control.value)
    const value = target[prop]

    if (control.value.schema.file) {
      // when file, add or remove from fileStore
      addOrRemoveFile(control.value.id, target, error)
      return control.value.data
    }

    if (value === '' || value === undefined) {
      // we need to set the value to undefined when the value
      // is empty to trigger validation
      return undefined
    }

    return getValue('onChange', control.value, value)
  }

  return {
    addOrRemoveFile,
    onHandleChange
  }
}

type FieldValueProps = {
  control: Control
  appliedOptions?: Record<string, string>
}

export const useFieldValue = ({ control, appliedOptions = {} }: FieldValueProps) => {
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
    case 'boolean': {
      return {
        [prop]: !!data
      }
    }
    default: {
      return {
        [prop]: data
      }
    }
  }
}

export const useFieldType = (schema: JsonSchema, uischema: UISchemaElement) => {
  const { options } = uischema
  const fieldTypes = Object.values(InputType)
  const extend = schema as JsonSchema & Record<InputType, boolean> & { format?: InputType }
  const key = fieldTypes.find((key) => extend[key])

  if (key) {
    return key
  }

  const { format, type } = { ...options, ...extend }

  if (type === 'boolean') {
    return InputType.CHECKBOX
  }

  if (format && fieldTypes.includes(format)) {
    return format
  }

  return (type as InputType) ?? InputType.TEXT
}

type FieldFileRemoveProps = {
  id: string
  index: number
}

export const useFieldFileRemove = ({ id, index }: FieldFileRemoveProps) => {
  const { getFile, addOrRemoveFile, removeFileByIdAndIndex } = useFileStore()

  const file = computed<File>(() => getFile(id, index))
  const hasFile = computed<boolean>(() => !!file.value)
  const label = computed<string | undefined>(() => formatFile(file.value?.name))

  return {
    hasFile,
    label,
    addOrRemoveFile,
    removeFileByIdAndIndex
  }
}

type FieldProps = {
  input: { id: string; type: InputType }
  control: Control
  error: string
  handleChange?: (_path: string, _value: any) => void
}

export const useField = ({ input, control, error, handleChange }: FieldProps) => {
  const fileStore = useFileStore()

  switch (input.type) {
    case InputType.NUMBER:
    case InputType.INTEGER: {
      return {
        tag: 'FormNumberControl',
        props: {
          ...input,
          control: control
        }
      }
    }
    case InputType.CHECKBOX_GROUP: {
      return {
        tag: 'FormCheckboxGroupControl',
        props: {
          ...input,
          control: control,
          handleChange: handleChange
        }
      }
    }
    case InputType.SELECT: {
      return {
        tag: 'FormSelectControl',
        props: {
          ...input,
          options: control.options
        }
      }
    }
    case InputType.FILE: {
      return {
        props: {
          ...input,
          value: undefined,
          control: control,
          error: error,
          isPending: fileStore.isUploadPending(control.id),
          handleChange: handleChange
        },
        tag: 'FormFileControl'
      }
    }
    case InputType.RADIO: {
      return {
        props: {
          ...input,
          control: control
        },
        tag: 'FormRadioControl'
      }
    }
    default: {
      break
    }
  }
  return {
    props: { ...input, control },
    tag: 'FormTextControl'
  }
}
