import { useFormStore } from '@/store/useFormStore'
import { InputType } from '@/type/input-types'
import { type FieldProp, FieldType } from '@/type/field-types'
import { toNestedObject } from '@/util/object-util'

const getDummyData = ({ type, format, iban, file, tel, enum: enums }: FieldProp) => {
  if (enums) {
    return enums[enums.length - 1]
  }
  if (tel) {
    return '+31611111111'
  }
  if (iban) {
    return 'NL91ABNA0417164300'
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
    case FieldType.BOOLEAN:
      return true
    case FieldType.STRING:
      return 'lorem ipsum'
    case FieldType.INTEGER:
      return 4
    case FieldType.NUMBER:
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
      while (key.length) props = props.properties?.[key.shift()!]
      return { key: path.join('.'), props }
    })
    const data = fields.reduce(
      (cul: FormData, { key, props }: { key: string; props: FieldProp }) => {
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
