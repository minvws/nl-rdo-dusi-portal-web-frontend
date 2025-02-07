import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'

import { and, uiTypeIs, rankWith, isControl } from '@jsonforms/core'
import FormCustomControl from './FormCustomControl.vue'

export const CustomControlRenderer: JsonFormsRendererRegistryEntry = {
  renderer: FormCustomControl,
  tester: rankWith(10, and(isControl, uiTypeIs('CustomControl')))
}
