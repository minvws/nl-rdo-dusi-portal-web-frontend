import type { Form, FormData, FormMetaData } from '@shared/types/form'
import type { JsonSchema } from '@jsonforms/core'
import type { UISchemaElement } from '@jsonforms/core'

import { isLabeled, isLayout } from '@jsonforms/core'

import { getValueFormKey } from '@shared/utils/object'
import { getDeepProps } from '@shared/utils/array'

import { getControlId } from './control'

const getScopesFromUISchema = (uischema: UISchemaElement) => {
  const key = 'elements'
  const elements = (uischema as any)?.[key] ?? []
  return getDeepProps(elements, key, 'scope').map(scope => getControlId(scope))
}

const filterPropertiesForUiSchema = ({ properties }: JsonSchema, uischema: UISchemaElement) => {
  const scopes = getScopesFromUISchema(uischema)
  return Object.entries(properties as any).reduce((cul, [key, value]) => {
    if (scopes.includes(key)) return { ...cul, [key]: value }
    return cul
  }, {})
}

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
    const uischema = el.elements[0]
    const properties = filterPropertiesForUiSchema(baseSchema, uischema)

    const dataschema: JsonSchema = {
      type: 'object',
      properties,
      required: el.options?.required ?? baseSchema.required ?? [],
      allOf: el.options?.allOf?.length ? el.options.allOf : baseSchema.allOf
    } as JsonSchema

    return { title, dataschema, uischema }
  })

  return forms
}

export const getFormTitle = ({ metadata }: { metadata?: FormMetaData }) => {
  return getValueFormKey(metadata, 'title')
}

export const transformFormValues = (values?: FormData) => {
  if (!values) return undefined
  return Object.entries(values).reduce((cul, [key, value]) => {
    if (value === null) return cul
    if (typeof value === 'object' && 'items' in value) {
      const { items } = value
      return {
        ...cul,
        [key]: items
      }
    }
    return {
      ...cul,
      [key]: value
    }
  }, {})
}

export const hasCustomControl = (element: { type: string; elements?: [] }) => {
  const { type, elements } = element
  if (type === 'CustomControl') {
    return true
  } else if (elements && Array.isArray(elements)) {
    for (const element of elements) {
      if (hasCustomControl(element)) {
        return true
      }
    }
  }

  return false
}
