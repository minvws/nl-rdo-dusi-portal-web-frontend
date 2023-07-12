import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'
import { rankWith, isControl } from '@jsonforms/core'
import FormCustomControl from './FormCustomControl.vue'

export const CustomControlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: FormCustomControl,
  tester: rankWith(1, isControl)
}
