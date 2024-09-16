import type { FormValue, Form, FormData, FormMetaData } from '@shared/types/form'
import type { JsonSchema } from '@jsonforms/core'
import type { UISchemaElement } from '@jsonforms/core'

import { isLabeled, isLayout } from '@jsonforms/core'

import { getValueFromKey } from '@shared/utils/object'
import { getDeepProps } from '@shared/utils/array'

import { getControlPath } from './control'

function getScopesFromUISchema(uischema: UISchemaElement): string[] {
  const key = 'elements'
  const elements = (uischema as any)?.[key] ?? []
  return getDeepProps(elements, key, 'scope').map((scope) => getControlPath(scope))
}

function filterPropertiesForUiSchema(
  baseSchema: JsonSchema,
  uischema: UISchemaElement
): JsonSchema['properties'] {
  const properties = baseSchema.properties ?? {}
  const scopes = getScopesFromUISchema(uischema)
  const result: JsonSchema['properties'] = {}

  for (const [key, value] of Object.entries(properties)) {
    if (scopes.includes(key)) {
      result[key] = value
    }
  }

  return result
}

export function transformForm(form: Form): Form[] {
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

export function getFormTitle({ metadata }: { metadata?: FormMetaData }): string {
  return getValueFromKey(metadata, 'title') ?? ''
}

export function transformFormValues(values?: FormData): FormData | undefined {
  if (!values) {
    return undefined
  }

  const transformedValues: FormData = {}

  for (const [key, value] of Object.entries(values)) {
    if (value === null) continue

    if (typeof value === 'object' && 'items' in value) {
      transformedValues[key] = value.items as FormValue
    } else {
      transformedValues[key] = value
    }
  }

  return transformedValues
}

export function hasCustomControl(element: { type: string; elements?: [] }): boolean {
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
