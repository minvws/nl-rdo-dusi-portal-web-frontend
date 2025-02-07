import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'

import { rankWith, uiTypeIs } from '@jsonforms/core'
import FormHtml from './FormHtml.vue'

export const FormHtmlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: FormHtml,
  tester: rankWith(1, uiTypeIs('FormHtml'))
}
