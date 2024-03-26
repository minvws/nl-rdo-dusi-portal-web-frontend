import type { Ref } from 'vue'
import type { JsonSchema, UISchemaElement } from '@jsonforms/core'
import type { ValidationError, Control, Field } from '@shared/types/field'
import type { FormValue } from '@shared/types/form'

import { InputType } from '@shared/types/input'

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

type FieldChangeProps = Field & { error: Ref<ValidationError | null> }

export const useFieldChange = ({ control, error }: FieldChangeProps) => {
  const { addOrRemoveFile } = useFileStore()

  function onHandleChange(target: HTMLInputElement): FormValue | undefined {
    const prop = getFieldProp(control.value)
    const value = target[prop]

    if (control.value.schema.file) {
      // when file, add or remove from fileStore
      const { id } = control.value
      addOrRemoveFile({ id, target, error })
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

export const useFieldFileRemove = () => {
  const { removeFileByIdAndIndex } = useFileStore()

  return {
    removeFileByIdAndIndex
  }
}

type FieldProps = {
  input: { id: string; type: InputType }
  control: Control
  error: ValidationError | null
  handleChange?: (_path: string, _value: any) => void,
  resetError?: () => void
}

export const useField = ({ input, control, error, handleChange, resetError }: FieldProps) => {
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
          handleChange: handleChange,
          resetError: resetError
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
