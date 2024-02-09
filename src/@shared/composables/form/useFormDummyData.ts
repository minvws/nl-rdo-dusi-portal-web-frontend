import type { FieldProp } from '@shared/types/field'
import type { FormData, FormValue } from '@shared/types/form'

import { useForms } from '@shared/composables/form/useForms'
import { InputType } from '@shared/types/input'
import { toNestedObject } from '@shared/utils/object'
import { log } from '@shared/utils/logger'

function truncateMaxLength(value = '', { maxLength }: FieldProp) {
  return maxLength ? value.slice(0, maxLength) : value
}

function getDummyData(props: FieldProp): FormValue | number | undefined {
  const { type, format, iban, file, tel, postalCode, title, enum: enums } = props
  if (enums) {
    return enums[0]
  }
  if (tel) {
    return '+31(0) 611111111'
  }
  if (iban) {
    return 'NL62ABNA9999841479'
  }
  if (postalCode) {
    return '1111 AA'
  }
  if (file) {
    // files can only be set with an user event
    return undefined
  }
  switch (format) {
    case InputType.DATE: {
      return new Date().toISOString().split('T')[0]
    }
    case InputType.EMAIL: {
      return 'e@mail.com'
    }
    default: {
      log('unknown format', format)
      break
    }
  }
  switch (type) {
    case 'boolean': {
      return true
    }
    case 'string': {
      return truncateMaxLength(title, props)
    }
    case 'integer': {
      return 4
    }
    case 'number': {
      return Math.PI
    }
    default: {
      log('unknown type', type)
      break
    }
  }
}

export const useFormDummyData = () => {
  const form = useForms()

  function setDummyData() {
    // get all scopes on the current form and set a value
    const scopes = form.getCurrentLinkedScopes()
    const data: FormData = {}
    const fields: { key: string; props: FieldProp }[] = scopes.map((key: string[]) => {
      let props: any = form.schema.value
      const path = [...key]

      while (key.length > 0) {
        const currentKey = key.shift()
        if (currentKey && props?.properties) {
          props = props.properties[currentKey]
        } else {
          break
        }
      }

      return { key: path.join('.'), props }
    })

    for (const { key, props } of fields) {
      if (props.default) {
        // do not overwrite default data
        continue
      }

      data[key] = getDummyData(props) as FormValue
    }

    const nestedObjectData = toNestedObject(data)

    form.setFormData(nestedObjectData)
    form.onValidate()
  }

  return {
    setDummyData
  }
}
