import { useFormStore } from '@shared/store/useFormStore'
import { InputType } from '@shared/types/input'
import type { FieldProp } from '@shared/types/field'
import { toNestedObject } from '@shared/utils/object'

const getDummyData = ({ type, format, iban, file, tel, postalCode, enum: enums }: FieldProp) => {
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
  }
  switch (type) {
    case 'boolean':
      return true
    case 'string':
      return 'lorem ipsum'
    case 'integer':
      return 4
    case 'number':
      return Math.PI
    default:
      return `unknown type ${type}`
  }
}

export const useFormDummyData = () => {
  return () => {
    // get all scopes on the current form and set a value
    const form = useFormStore()
    const scopes = form.getCurrentLinkedScopes()
    const fields = scopes.map((key: string[]) => {
      let props: any = form.schema
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
}
