import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'
import { rankWith } from '@jsonforms/core'
import CustomGroupControl from './CustomGroupControl.vue'

export const CustomGroupControlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: CustomGroupControl,
  tester: rankWith(2, ({ type }) => type === 'CustomGroupControl')
}
