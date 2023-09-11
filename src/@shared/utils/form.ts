import type { Form } from '@shared/types/form'
import type { JsonSchema } from '@jsonforms/core'
import { isLabeled, isLayout } from '@jsonforms/core'
import { getValueFormKey } from '@shared/utils/object'

export const transformForm = (form: Form): Form[] => {
  const baseSchema: JsonSchema = form.dataschema
  if (form.uischema.type !== 'CustomPageNavigationControl') {
    // assume single page form
    return [form]
  }

  if (!isLayout(form.uischema)) {
    throw 'UI schema is invalid, expected page navigation layout!'
  }

  const forms: Form[] = form.uischema.elements.map(function (el) {
    if (el.type !== 'CustomPageControl' || !isLabeled(el) || !isLayout(el)) {
      throw 'UI schema is invalid, expected page control layout'
    }

    const title: string | undefined = isLabeled(el) ? el.label : undefined

    const dataschema: JsonSchema = {
      type: 'object',
      properties: baseSchema.properties,
      ...el.options,
      required: el.options?.['required'] ?? baseSchema.required ?? []
    } as JsonSchema

    const uischema = el.elements[0]
    return { title, dataschema, uischema }
  })

  return forms
}

export const getFormTitle = ({ metadata }: { metadata: Record<string, any> }) => {
  return getValueFormKey(metadata, 'title')
}
