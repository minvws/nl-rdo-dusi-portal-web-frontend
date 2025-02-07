import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'

import { rankWith, uiTypeIs } from '@jsonforms/core'
import FormGroupControl from './FormGroupControl.vue'

export const FormGroupControlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: FormGroupControl,
  tester: rankWith(2, uiTypeIs('FormGroupControl'))
}
