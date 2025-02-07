import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'

import { rankWith, uiTypeIs } from '@jsonforms/core'
import FormTransitionHistory from './FormTransitionHistory.vue'

export const FormTransitionHistoryRenderer: JsonFormsRendererRegistryEntry = {
  renderer: FormTransitionHistory,
  tester: rankWith(1, uiTypeIs('FormTransitionHistory'))
}
