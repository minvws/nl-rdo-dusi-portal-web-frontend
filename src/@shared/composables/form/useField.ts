import type { JsonSchema, UISchemaElement } from '@jsonforms/core'
import type { ValidationError, Control, Field } from '@shared/types/field'
import type { FormValue } from '@shared/types/form'

import { InputType } from '@shared/types/input'

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

type FieldChangeProps = Field

export const useFieldChange = ({ control }: FieldChangeProps) => {

  function onHandleChange(target: HTMLInputElement): FormValue | undefined {
    const prop = getFieldProp(control.value)
    const value = target[prop]

    if (control.value.schema.file) {
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

type FieldProps = {
  input: { id: string; type: InputType }
  control: Control
  validationError?: ValidationError
  handleChange?: (_path: string, _value: any) => void
  resetError?: () => void
}

export const useField = ({ input, control, validationError, handleChange, resetError }: FieldProps) => {
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
        tag: 'FormFileControl',
        props: {
          ...input,
          control: control,
          error: validationError,
          handleChange: handleChange,
          resetError: resetError
        }
      }
    }
    case InputType.RADIO: {
      return {
        tag: 'FormRadioControl',
        props: {
          ...input,
          control: control
        }
      }
    }
    default: {
      break
    }
  }
  return {
    tag: 'FormTextControl',
    props: {
      ...input,
      control: control
    }
  }
}
