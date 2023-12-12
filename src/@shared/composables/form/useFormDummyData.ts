import type { FieldProp } from '@shared/types/field'

import { useForms } from '@shared/composables/form/useForms'
import { InputType } from '@shared/types/input'
import { toNestedObject } from '@shared/utils/object'
import { log } from '@shared/utils/logger'

const truncateMaxLength = (value = '', { maxLength }: FieldProp) => {
  if (!maxLength) return value
  return value.substring(0, maxLength)
}

const getDummyData = (props: FieldProp) => {
  const { type, format, iban, file, tel, postalCode, title, enum: enums } = props
  if (enums) {
    return enums[0]
  }
  if (tel) {
    return '+31(0) 611111111'
  }
  if (iban) {
    return 'NL91ABNA0417164300'
  }
  if (postalCode) {
    return '1111 AA'
  }
  if (file) {
    // files can only be set with an user event
    return undefined
  }
  switch (format) {
    case InputType.DATE:
      return new Date().toISOString().split('T')[0]
    case InputType.EMAIL:
      return 'e@mail.com'
    default:
      log('unknown format', format)
      break
  }
  switch (type) {
    case 'boolean':
      return true
    case 'string':
      return truncateMaxLength(title, props)
    case 'integer':
      return 4
    case 'number':
      return Math.PI
    default:
      log('unknown type', type)
      break
  }
}

export const useFormDummyData = () => {
  const form = useForms()

  const setDummyData = () => {
    // get all scopes on the current form and set a value
    const scopes = form.getCurrentLinkedScopes()
    const fields = scopes.map((key: string[]) => {
      let props: any = form.schema.value
      const path = [...key]

      while (key.length) {
        const currentKey = key.shift()
        if (currentKey && props?.properties) {
          props = props.properties[currentKey]
        } else {
          break
        }
      }

      return { key: path.join('.'), props }
    })

    const data = fields.reduce(
      (cul: FormData, { key, props }: { key: string; props: FieldProp }) => {
        if (props.default) {
          // do not overwrite default data
          return cul
        }
        return {
          ...cul,
          [key]: getDummyData(props)
        }
      },
      {} as FormData
    )
    form.setFormData(toNestedObject(data))
    form.onValidate()
  }
  return {
    setDummyData
  }
}
