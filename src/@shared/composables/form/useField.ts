import type { JsonSchema, UISchemaElement } from '@jsonforms/core'
import type { Control, ControlSchema, Field, ValidationError } from '@shared/types/field'
import type { FormValue } from '@shared/types/form'

import { InputType } from '@shared/types/input'

import { getValue } from '@shared/composables/form/useCustomControlInput'
import { getSchemaBasedInputType, isInputType } from '@shared/utils/input-types'
import { formatAsDate } from '@shared/utils/date'

function getFieldProp(schemaType: string | string[] | undefined) {
  const defaultProp = 'value'
  if (typeof schemaType !== 'string') {
    return defaultProp
  }

  switch (schemaType) {
    case 'boolean': {
      return 'checked'
    }
    default: {
      return defaultProp
    }
  }
}

type FieldChangeProps = Field

export const useFieldChange = ({ control }: FieldChangeProps) => {

  function onHandleChange(target: HTMLInputElement): FormValue | undefined {
    const prop = getFieldProp(control.value.schema.type)
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

export const useFieldValue = (data: FormValue, schema: ControlSchema, appliedOptions: Record<string, string>|undefined, fieldType: InputType) => {
  const { file, type } = schema

  const prop = getFieldProp(schema.type)

  if (file) {
    // file input
    return {
      [prop]: data,
      accept: appliedOptions?.accept,
      maxFileSize: appliedOptions?.maxFileSize
    }
  }

  if (fieldType === InputType.TEXT && schema.format === InputType.DATE && typeof data === 'string') {
    // format date when readonly "date" text field
    data = data ? formatAsDate(data, 'nl-NL') : '-'
  }

  if (fieldType === InputType.TEXT && typeof data !== 'string') {
    data = data ?? ''

    return {
      [prop]: String(data)
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

export const useFieldType = (schema: JsonSchema, uischema: UISchemaElement, fieldIsReadonly: boolean): InputType => {
  const schemaBasedInputType = getSchemaBasedInputType(schema)
  if (schemaBasedInputType) {
    return schemaBasedInputType
  }

  /**
   * This list is based on the field types that are defined in the portal shared package.
   * SubsidyStageDataSchemaBuilder::createFieldDataSchema
   *
   * Possible string values for schema.type:
   * - string
   * - number
   * - integer
   * - boolean
   * - array
   */
  const schemaType: string | string[] | undefined = schema.type
  const formatType: string | undefined = uischema.options?.format || schema.format
  // for better screen reader support set the readonly number fields and date fields to text
  const readonlyTextTypes: InputType[] = [InputType.NUMBER, InputType.INTEGER, InputType.DATE]

  if (schemaType === 'boolean') {
    return InputType.CHECKBOX
  }

  if (formatType && isInputType(formatType)) {
    if (fieldIsReadonly && readonlyTextTypes.includes(formatType)) {
      // for better screen reader support set the readonly number fields and date fields to text
      return InputType.TEXT
    }

    return formatType
  }

  if (typeof schemaType !== 'string' || !isInputType(schemaType)) {
    return InputType.TEXT
  }

  if (fieldIsReadonly && readonlyTextTypes.includes(schemaType)) {
    // for better screen reader support set the readonly number fields and date fields to text
    return InputType.TEXT
  }

  return schemaType
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

export const isFieldReadonly = (schema: JsonSchema, uischema: UISchemaElement): boolean => {
  // @ts-expect-error readonly is not part of the JsonSchema4, but it is in the JsonSchema7
  let readonlyInSchema = schema?.readOnly

  return readonlyInSchema || uischema.options?.readonly || false
}

export const fieldTypeSupportsReadonly = (fieldType: InputType): boolean => {
  return [InputType.DATE, InputType.EMAIL, InputType.INTEGER, InputType.NUMBER, InputType.TEL, InputType.TEXT, InputType.TEXTAREA].includes(fieldType)
};
