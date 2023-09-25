import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'

import { rankWith } from '@jsonforms/core'
import FormGroupControl from './FormGroupControl.vue'

export const FormGroupControlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: FormGroupControl,
  tester: rankWith(2, ({ type }) => type === 'FormGroupControl')
}
