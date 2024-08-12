import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core'

import { rankWith, uiTypeIs } from '@jsonforms/core'
import FormResultsTable from './FormResultsTable.vue'

export const FormResultsTableRenderer: JsonFormsRendererRegistryEntry = {
  renderer: FormResultsTable,
  tester: rankWith(1, uiTypeIs('FormResultsTable'))
}
